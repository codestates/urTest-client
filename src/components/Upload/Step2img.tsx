import React, { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";
import Previews from "./Dropzone";

import { inputVar, uploadVar } from "../../common/graphql/client";
import SweetAlert from "react-bootstrap-sweetalert";
import { Col, Row, Button } from "react-bootstrap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";

const Step2img = () => {
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const input = useReactiveVar(inputVar);
  const isUpload = useReactiveVar(uploadVar);
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
  const onSubmit = () => {
    if (isUpload) {
      return alert(
        "백그라운드에서 업로드가 진행중입니다 3초 후 다시 시도해주세요"
      );
    } else if (uploadObj.files.length >= 4) {
      inputVar({ ...input, step2clear: true });
      uploadObj.files = [];
      uploadObj.textTest = [];
      localStorage.setItem("uploadObj", JSON.stringify(uploadObj));
      setSweetAlertShow(true);
    } else {
      return alert("최소 4장이상의 이미지가 필요합니다");
    }
  };
  return (
    <>
      {!input.step1clear ? <Redirect to="/multistep" /> : ""}
      <Row className="justify-content-md-center mt-4 mx-2">
        <Col md={8} lg={6} className="bg-light rounded pt-3 pb-3">
          <Previews files={uploadObj.files} />
          <AwesomeButton type="primary" className="uploadbtn center w-100">
            <Button block variant="urtest" type="submit" onClick={onSubmit}>
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
          </AwesomeButton>
        </Col>
      </Row>
      <SweetAlert
        show={sweetAlertShow}
        showConfirm={false}
        success
        title="사진 업로드 완료!"
        onConfirm={() => {
          history.push("/multistep/step3img");
        }}
        onCancel={() => {
          history.push("/multistep/step3img");
        }}
      >
        다음단계에서 사진들을 세팅합니다
      </SweetAlert>
    </>
  );
};

export default Step2img;
