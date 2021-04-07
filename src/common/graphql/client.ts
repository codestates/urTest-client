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
  textTest: [],
  types: "imgGame",
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
// 텍스트게임 초기테이블헤더
export const textUploadHeaders = makeVar([
  {
    dataField: "id",
    text: "문항번호",
  },
  {
    dataField: "question",
    text: "질문",
  },
  {
    dataField: "answer1",
    text: "답변1",
  },
  {
    dataField: "answer2",
    text: "답변2",
  },
]);
export const isLoginVar = makeVar(false);

export const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: true,
});

export default client;
