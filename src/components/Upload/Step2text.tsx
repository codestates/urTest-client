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
  mutation editPhotoName($id: Int!, $photoName: String) {
    editPhotoName(id: $id, photoName: $photoName) {
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
  const onSubmit = () => {
    console.log(uploadObj.textTest);
    // inputVar({ ...input, step2clear: true });
    // history.push("/multistep/step3text");
  };
  return (
    <>
      {!input.step1clear ? <Redirect to="/multistep" /> : ""}
      <Row className="justify-content-md-center">
        <Col md={8} className="bg-light rounded pt-3 pb-3">
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
            Next Step
          </Button>
        </Col>
      </Row>
      <SweetAlert
        show={sweetAlertShow}
        showConfirm={false}
        success
        title="업로드 완료!"
        onConfirm={() => {
          history.push("/");
        }}
        onCancel={() => {
          history.push("/");
        }}
      >
        홈화면으로 이동합니다
      </SweetAlert>
    </>
  );
};

export default Step2img;
