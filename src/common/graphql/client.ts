import { ApolloClient, InMemoryCache } from "@apollo/client";
import { makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

// 헤더
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

// 전역 상태
export const inputVar = makeVar({
  types: "imggame",
  step1clear: false,
  step2clear: false,
});
export const searchState = makeVar("");

export const uploadVar = makeVar(false);

export const isLoginVar = makeVar(false);

export const cache = new InMemoryCache();

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: true,
});

export default client;
