import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
import { makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// 헤더
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 전역 상태
export const inputVar = makeVar({
  title: "",
  desc: "",
  files: [],
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

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: true,
});

export default client;
