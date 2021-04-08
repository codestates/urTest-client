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
// 텍스트게임 초기테이블
export const textUploadTable = makeVar([
  { id: "1", question: "질문1", answer1: "답변1", answer2: "답변2" },
  { id: "2", question: "질문2", answer1: "답변1", answer2: "답변2" },
  { id: "3", question: "질문3", answer1: "답변1", answer2: "답변2" },
  { id: "4", question: "질문4", answer1: "답변1", answer2: "답변2" },
  { id: "5", question: "", answer1: "", answer2: "" },
  { id: "6", question: "", answer1: "", answer2: "" },
  { id: "7", question: "", answer1: "", answer2: "" },
  { id: "8", question: "", answer1: "", answer2: "" },
  { id: "9", question: "", answer1: "", answer2: "" },
  { id: "10", question: "", answer1: "", answer2: "" },
  { id: "11", question: "", answer1: "", answer2: "" },
  { id: "12", question: "", answer1: "", answer2: "" },
  { id: "13", question: "", answer1: "", answer2: "" },
  { id: "14", question: "", answer1: "", answer2: "" },
  { id: "15", question: "", answer1: "", answer2: "" },
  { id: "16", question: "", answer1: "", answer2: "" },
]);
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
