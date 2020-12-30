import React from "react";
import { useMutation } from "@apollo/react-hooks";

import PetBox from "./PetBox";
import { OPTIMISTIC_ID } from "../../constants";
import { AllPets, DeletePet } from '../graphQL';

export default function PetsList({ pets }) {
  const [deletePet, { data: mutationData, error: mutationError }] = useMutation(
    DeletePet,
    {
      update: (cache, { data: { deletePet: { id: deletedPetId } } }) => {
        const { pets } = cache.readQuery({ query: AllPets });
        cache.writeQuery({
          query: AllPets,
          data: { pets: pets.filter(({ id }) => id !== deletedPetId ) },
        });
      }
    }
  )

  const onDelete = (petId) => {
    deletePet({
      variables: { petId },
      optimisticResponse: {
        __typename: 'Mutation',
        deletePet: {
          __typename: 'DeletePetResponse',
          id: petId,
        },
      }
    });
  }

  return (
    <div className="row">
      {pets.map((pet) => (
        <div
          className="col-xs-12 col-md-4 col"
          style={{ opacity: pet.id === OPTIMISTIC_ID ? "50%" : "100%" }}
          key={pet.id}
        >
          <div className="box">
            <PetBox onDelete={onDelete} pet={pet} />
          </div>
        </div>
      ))}
      {mutationError && <h3>Mutation error: {mutationError}</h3>}
    </div>
  );
}

PetsList.defaultProps = {
  pets: [],
};
