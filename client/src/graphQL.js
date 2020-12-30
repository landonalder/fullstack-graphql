import gql from 'graphql-tag';

export const PETS_FIELDS = gql`
    fragment PetsFields on Pet {
        id
        img
        name
        type
        vaccinated @client
        owner {
            id
            age @client
        }
    }
`;

export const AllPets = gql`
    query AllPets {
        pets {
            ...PetsFields
        }
    }
    ${PETS_FIELDS}
`;

export const CreatePet = gql`
    mutation CreatePet($newPet: CreatePetInput!) {
        createPet(input: $newPet) {
            ...PetsFields
        }
    }
    ${PETS_FIELDS}
`;

export const DeletePet = gql`
    mutation DeletePet($petId: ID!) {
        deletePet(petId: $petId) {
            id
        }
    }
`;

export const GetUser = gql`
    query GetUser {
        user {
            id
            username
        }
    }
`;
