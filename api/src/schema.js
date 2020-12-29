const { gql, ApolloServer } = require("apollo-server");

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
  }

  input CreatePetInput {
    name: String!
    type: PetType!
  }

  type Mutation {
    createPet(input: CreatePetInput!): Pet!
  }
`;

module.exports = typeDefs;
