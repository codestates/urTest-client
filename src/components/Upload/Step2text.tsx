import React, { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import { inputVar } from "../../common/graphql/client";
import { Redirect, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import { Col, Row, Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
const UPLOAD_TEXT = gql`
  mutation uploadText($title: String, $desc: String, $textTest: [data]) {
    uploadText(title: $title, desc: $desc, textTest: $textTest) {
      error
      ok
    }
  }
`;

const Step2img = () => {
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const input = useReactiveVar(inputVar);
  const history = useHistory();
  const uploadObjStr = localStorage.getItem("uploadObj");
  const [uploadText] = useMutation(UPLOAD_TEXT, {
    onCompleted: () => {
      setSweetAlertShow(true);
      return;
    },
  });
  const uploadObj = uploadObjStr
    ? JSON.parse(uploadObjStr)
    : {
        title: "",
        desc: "",
        files: [],
        textTest: [
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
        ],
      };
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
  const onSubmit = async () => {
    const newArr = uploadObj.textTest.filter((row: any) => {
      delete row.id;
      if (row.question && row.answer1 && row.answer2) {
        return row;
      }
    });
    await uploadText({
      variables: {
        title: uploadObj.title,
        desc: uploadObj.desc,
        textTest: newArr,
      },
    });
  };
  return (
    <>
      {!input.step1clear ? <Redirect to="/multistep" /> : ""}
      <Row className="justify-content-md-center mt-4 mx-2">
        <Col md={8} lg={7} className="bg-light3 rounded pt-3 pb-3">
          <>
            <BootstrapTable
              keyField="id"
              data={uploadObj.textTest}
              columns={columns}
              cellEdit={cellEditFactory({
                mode: "click",
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
            {/* <ArrowRightCircleFill/> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </Button>
        </Col>
      </Row>
      <SweetAlert
        show={sweetAlertShow}
        showConfirm={false}
        success
        title="업로드 완료!"
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
          inputVar({
            types: "imggame",
            step1clear: false,
            step2clear: false,
          });
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
          inputVar({
            types: "imggame",
            step1clear: false,
            step2clear: false,
          });
          localStorage.setItem("uploadObj", JSON.stringify(uploadReset));
          history.push("/");
        }}
      >
        홈화면으로 이동합니다
      </SweetAlert>
    </>
  );
};

export default Step2img;
