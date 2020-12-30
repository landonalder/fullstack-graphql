const { gql, ApolloServer } = require('apollo-server');

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
    enum PetType {
        DOG
        CAT
    }

    type User {
        id: ID!
        pets: [Pet]!
        username: String!
    }

    type Pet {
        id: ID!
        img: String!
        createdAt: String!
        name: String!
        type: PetType!
        owner: User!
    }

    type DeletePetResponse {
        id: ID!
    }

    input PetsInput {
        name: String
        type: PetType
    }

    input PetInput {
        id: ID!
    }

    type Query {
        pets(input: PetsInput): [Pet]!
        pet(input: PetInput): Pet
        user: User!
    }

    input CreatePetInput {
        name: String!
        type: PetType!
    }

    input UpdatePetInput {
        name: String!
        type: PetType!
        id: ID!
    }

    type Mutation {
        createPet(input: CreatePetInput!): Pet!
        deletePet(petId: ID!): DeletePetResponse!
        updatePet(input: UpdatePetInput!): Pet!
    }
`;

module.exports = typeDefs;
