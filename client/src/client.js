import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";

import gql from "graphql-tag";

/**
 * Create a new apollo client and export as default
 */

const typeDefs = gql`
  extend type User {
    age: Int
  }

  extend type Pet {
      vaccinated: Boolean!
  }
`;

const resolvers = {
  User: {
    age() {
      return 50;
    },
  },
  Pet: {
      vaccinated() {
          return true;
      }
  }
};

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const delay = setContext(
  (request) =>
    new Promise((resolve, reject) => {
      setTimeout(resolve, 800);
    })
);

const link = ApolloLink.from([delay, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs,
});

export default client;
