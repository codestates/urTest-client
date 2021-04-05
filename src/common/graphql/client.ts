import { ApolloClient, InMemoryCache } from "@apollo/client";
import { makeVar } from "@apollo/client";

// 전역 상태
export const inputVar = makeVar({ firstName: "", lastName: "" });

export const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache,
  connectToDevTools: true,
});

export default client;
