import React from "react";
import { useReactiveVar } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import { inputVar } from "../../common/graphql/client";
import { Col, Row, Button } from "react-bootstrap";

const Step2img = () => {
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
  console.log(uploadObj);
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
  const onSubmit = (data: any) => {
    inputVar({ ...input, step2clear: true });
    history.push("/multistep/step3text");
  };
  // const textArr: any = [];
  // testText.map((row) => {
  //   if (row.question !== "" && row.answer1 !== "" && row.answer2 !== "") {
  //     textArr.push([row.question, row.answer1, row.answer2]);
  //   }
  // });
  // if (textArr.length < 4 || 16 < textArr.length) {
  //   return alert("문항수는 4~16개입니다");
  // }
  // inputVar({ ...input, ...data });
  // textArr.map((row: any) => {
  // inputVar().testText?.push(row);
  // });
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
                // afterSaveCell: (
                //   oldValue: any,
                //   newValue: any,
                //   row: any,
                //   column: any
                // ) => {
                //   onAfterSave(newValue);
                // },
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
    </>
  );
};

export default Step2img;
