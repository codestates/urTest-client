import React from "react";
import { useReactiveVar } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";
import Previews from "./Dropzone";

import { inputVar, uploadVar } from "../../common/graphql/client";
import { Col, Row, Button } from "react-bootstrap";

const Step2img = () => {
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
  const onSubmit = (data: any) => {
    if (isUpload) {
      return alert(
        "백그라운드에서 업로드가 진행중입니다 3초 후 다시 시도해주세요"
      );
    }
    inputVar({ ...input, step2clear: true });
    uploadObj.files = [];
    uploadObj.textTest = [];
    localStorage.setItem("uploadObj", JSON.stringify(uploadObj));
    history.push("/multistep/step3img");
  };
  return (
    <>
      {!input.step1clear ? <Redirect to="/multistep" /> : ""}
      <Row className="justify-content-md-center mt-4">
        <Col md={8} className="bg-light rounded pt-3 pb-3">
          <Previews />
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
    </>
  );
};

export default Step2img;
