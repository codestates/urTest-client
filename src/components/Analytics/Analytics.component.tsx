import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Comment from "../Comment/Comment.component";
import CommentItem from "../Comment/CommentItem.component";
import SweetAlert from "react-bootstrap-sweetalert";

// 쿼리
const GET_CONTENT = gql`
  query getContent($id: Int!) {
    getContent(id: $id) {
      comments {
        contentId
        desc
        id
        password
        updatedAt
      }
      desc
      id
      photos {
        contentId
        id
        photoName
        photoUrl
      }
      question {
        answer {
          body
          createdAt
          id
          questionId
          updatedAt
        }
        contentId
        questionBody
        id
        updatedAt
      }
      type
      title
      updatedAt
    }
  }
`;
const ADD_COMMENT = gql`
  mutation MyMutation($desc: String!, $id: Int!, $password: String!) {
    addComment(desc: $desc, id: $id, password: $password) {
      error
      ok
    }
  }
`;

const Analytics = (props: any) => {
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const [type, setType] = useState("imggame" as any);
  const [imgs, setImgs] = useState([] as any[]);
  const [textTests, setTextTests] = useState([] as any[]);
  const [comments, setComments] = useState([] as any[]);
  const [title, setTitle] = useState("" as any);
  const [desc, setDesc] = useState("" as any);
  const [modalId, setModalId] = useState(0 as any);
  const [modalPassword, setModalPassword] = useState("" as any);
  const [uploadContent] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      console.log(comments);
      // setComments([...comments, ])
      return;
    },
  });

  const { loading } = useQuery(GET_CONTENT, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: (data) => {
      setType(data.getContent.type);
      setTitle(data.getContent.title);
      setDesc(data.getContent.desc);
      setComments(data.getContent.comments);
      if (type === "imggame") {
        setImgs(data.getContent.photos);
      }
      if (type === "textgame") {
        setTextTests(data.getContent.question);
      }

      console.log(data);
    },
  });
  const handleCommentDelete = (id: any, password: any) => {
    setSweetAlertShow(true);
    setModalId(id);
    setModalPassword(password);
  };
  console.log(props.gameid);
  return (
    <>
      <Comment />
      <CommentItem
        id={1}
        password="test"
        handleCommentDelete={handleCommentDelete}
      />
      <CommentItem
        id={2}
        password="tes2"
        handleCommentDelete={handleCommentDelete}
      />
      <CommentItem
        id={3}
        password="test3"
        handleCommentDelete={handleCommentDelete}
      />
      <CommentItem
        id={4}
        password="test4"
        handleCommentDelete={handleCommentDelete}
      />
      <CommentItem
        id={5}
        password="test5"
        handleCommentDelete={handleCommentDelete}
      />
      <SweetAlert
        show={sweetAlertShow}
        input
        required
        confirmBtnText="삭제"
        btnSize="md"
        confirmBtnBsStyle="danger"
        inputType="password"
        title="Enter Password"
        validationMsg="비밀번호를 입력해주세요"
        onConfirm={(e) => {
          console.log(e);
          console.log(modalId);
          console.log(modalPassword);
        }}
        onCancel={() => {
          setSweetAlertShow(false);
        }}
      />
    </>
  );
};

export default Analytics;
