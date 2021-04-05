import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { makeVar } from "@apollo/client";

// 전역 상태
export const inputVar = makeVar({
  title: "",
  desc: "",
  step1clear: false,
});
export const isLoginVar = makeVar(false);
// 전역쿼리
export const GET_INPUT_VAR = gql`
  query {
    input @client
  }
`;

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        input() {
          return inputVar();
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache,
  connectToDevTools: true,
});

export default client;
