import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import PetsList from '../components/PetsList';
import NewPetModal from '../components/NewPetModal';
import Loader from '../components/Loader';
import { AllPets, CreatePet, GetUser } from '../graphQL';
import { OPTIMISTIC_ID } from '../../constants';

const Modal = {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
};

export default function Pets() {
    const [modal, setModal] = useState(null);
    const [editingPetId, setEditingPetId] = useState(null);
    const { data, error, loading } = useQuery(AllPets);
    const { data: userData, error: userQueryError } = useQuery(GetUser);
    const [createPet, { data: mutationData, error: mutationError }] = useMutation(CreatePet, {
        update: (cache, { data: { createPet } }) => {
            const { pets } = cache.readQuery({ query: AllPets });
            cache.writeQuery({
                query: AllPets,
                data: { pets: [createPet, ...data.pets] },
            });
        },
    });

    const onSubmit = (params) => {
        createPet({
            variables: { newPet: params },
            optimisticResponse: {
                __typename: 'Mutation',
                createPet: {
                    __typename: 'Pet',
                    id: OPTIMISTIC_ID,
                    img: 'https://via.placeholder.com/300',
                    name: params.name,
                    type: params.type,
                    owner: userData.user.id,
                },
            },
        });
        setModal(null);
    };

    if (modal) {
        return modal === Modal.CREATE ? (
            <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(null)} />
        ) : (
            <EditPetModal
                onCancel={() => setModal(null)}
                onSubmit={() => {
                    console.log('submitted!');
                }}
                petId={editingPetId}
                pets={data.pets}
            />
        );
    }

    if (error || mutationError || userQueryError) {
        return <h1>ERROR!</h1>;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="page pets-page">
            <section>
                <div className="row betwee-xs middle-xs">
                    <div className="col-xs-10">
                        <h1>Pets</h1>
                    </div>

                    <div className="col-xs-2">
                        <button onClick={() => setModal(Modal.CREATE)}>new pet</button>
                    </div>
                </div>
            </section>
            <section>
                <PetsList
                    onEdit={(petId) => {
                        setEditingPetId(petId);
                        setModal(Modal.EDIT);
                    }}
                    pets={data.pets}
                />
            </section>
        </div>
    );
}
