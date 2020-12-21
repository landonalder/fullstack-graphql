import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";

const AllPets = gql`
  query AllPets {
    pets {
      id
      img
      name
      type
    }
  }
`;

const CreatePet = gql`
  mutation CreatePet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      img
      name
      type
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, error, loading } = useQuery(AllPets);
  const [
    createPet,
    { data: mutationData, error: mutationError, loading: mutationLoading },
  ] = useMutation(CreatePet);

  const onSubmit = (params) => {
    createPet({ variables: { newPet: params } });
    setModal(false);
  };

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  if (error || mutationError) {
    return <h1>ERROR!</h1>;
  }

  if (loading || mutationLoading) {
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
