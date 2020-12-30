import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";
import { AllPets, CreatePet, GetUser } from "../graphQL";
import { OPTIMISTIC_ID } from "../../constants";

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, error, loading } = useQuery(AllPets);
  const { data: userData, error: userQueryError } = useQuery(GetUser);
  const [createPet, { data: mutationData, error: mutationError }] = useMutation(
    CreatePet,
    {
      update: (cache, { data: { createPet } }) => {
        const { pets } = cache.readQuery({ query: AllPets });
        cache.writeQuery({
          query: AllPets,
          data: { pets: [createPet, ...data.pets] },
        });
      },
    }
  );

  const onSubmit = (params) => {
    createPet({
      variables: { newPet: params },
      optimisticResponse: {
        __typename: "Mutation",
        createPet: {
          __typename: "Pet",
          id: OPTIMISTIC_ID,
          img: "https://via.placeholder.com/300",
          name: params.name,
          type: params.type,
          owner: userData.user.id,
        },
      },
    });
    setModal(false);
  };

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
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
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  );
}
