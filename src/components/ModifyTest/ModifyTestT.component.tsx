import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import { useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import { Col, Row, Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import jwt from "jsonwebtoken";

const GET_CONTENT = gql`
  query getContent($id: Int!) {
    getContent(id: $id) {
      id
      question {
        answer {
          body
          createdAt
          id
          questionId
          updatedAt
        }
        contentId
        id
        questionBody
        updatedAt
      }
      userId
      title
      desc
      type
    }
  }
`;

const EDIT_TEXT = gql`
  mutation editTxt(
    $id: Int!
    $question: String
    $answer1: String
    $answer2: String
  ) {
    editTxt(
      id: $id
      answer1: $answer1
      answer2: $answer2
      question: $question
    ) {
      error
      ok
    }
  }
`;

const ModifyTestT = (props: any) => {
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const [textTests, setTextTests] = useState([] as any[]);
  const history = useHistory();
  const [editTxt] = useMutation(EDIT_TEXT, {
    onCompleted: (data) => {
      console.log(data);
      return;
    },
  });
  const textArr: any = [];
  const {} = useQuery(GET_CONTENT, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: async (data) => {
      const token = localStorage.getItem("token");
      const userId = jwt.verify(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        token,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        process.env.REACT_APP_SECRET_KEY,
        function (err: any, decoded: any) {
          return decoded.id;
        }
      );
      if (data.getContent.userId !== +userId) {
        history.push("/");
        return;
      }
      if (data.getContent.type !== "textgame") {
        history.push("/");
        return;
      }
      data.getContent.question.map((question: any, idx: number) => {
        textArr[idx] = {
          id: idx + 1,
          qid: question.id,
          question: question.questionBody,
          answer1: question.answer[0].body,
          answer2: question.answer[1].body,
          answer1Count: question.answer[0].winCount,
          answer2Count: question.answer[1].winCount,
        };
      });
      setTextTests(textArr);
      return;
    },
    fetchPolicy: "cache-and-network",
  });

  const columns = [
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
  ];

  const onAfterSave = async (row: any) => {
    console.log(row);
    await editTxt({
      variables: {
        id: row.qid,
        question: row.question,
        answer1: row.answer1,
        answer2: row.answer2,
      },
    });
  };

  const onSubmit = async () => {
    setSweetAlertShow(true);
    return;
  };
  return (
    <>
      <Row className="justify-content-md-center mt-4 mx-2">
        <Col md={8} className="bg-light rounded pt-3 pb-3">
          <>
            <BootstrapTable
              keyField="id"
              data={textTests}
              columns={columns}
              cellEdit={cellEditFactory({
                mode: "click",
                afterSaveCell: (oldValue: any, newValue: any, row: any) => {
                  onAfterSave(row);
                },
              })}
            />
          </>
          <Button
            block
            variant="dark"
            type="submit"
            size="lg"
            onClick={onSubmit}
          >
            수정 완료
          </Button>
        </Col>
      </Row>
      <SweetAlert
        show={sweetAlertShow}
        showConfirm={false}
        success
        title="수정 완료!"
        onConfirm={() => {
          const uploadReset = {
            title: "",
            desc: "",
            files: [],
            textTest: [
              {
                id: "1",
                question: "질문1",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "2",
                question: "질문2",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "3",
                question: "질문3",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "4",
                question: "질문4",
                answer1: "답변1",
                answer2: "답변2",
              },
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
            ],
          };

          localStorage.setItem("uploadObj", JSON.stringify(uploadReset));
          history.push("/");
        }}
        onCancel={() => {
          const uploadReset = {
            title: "",
            desc: "",
            files: [],
            textTest: [
              {
                id: "1",
                question: "질문1",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "2",
                question: "질문2",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "3",
                question: "질문3",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "4",
                question: "질문4",
                answer1: "답변1",
                answer2: "답변2",
              },
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
            ],
          };

          localStorage.setItem("uploadObj", JSON.stringify(uploadReset));
          history.push("/");
        }}
      >
        홈화면으로 이동합니다
      </SweetAlert>
    </>
  );
};

export default ModifyTestT;
