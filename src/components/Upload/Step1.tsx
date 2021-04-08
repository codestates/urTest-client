/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useReactiveVar, useMutation, gql } from "@apollo/client";
import { inputVar } from "../../common/graphql/client";
import { Form, Button, Col, Row } from "react-bootstrap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import cellEditFactory from "react-bootstrap-table2-editor";
// import Comment from "../Comment/Comment.component";
// import CommentItem from "../Comment/CommentItem.component";

const UPLOAD_CONTENT = gql`
  mutation uploadContent($title: String!, $desc: String!) {
    uploadContent(title: $title, desc: $desc) {
      id
    }
  }
`;

const Step1 = () => {
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
  const [types, setTypes] = useState("imggame");

  const [uploadContent] = useMutation(UPLOAD_CONTENT, {
    onCompleted: (data) => {
      uploadObj.contentId = data.uploadContent.id;
      console.log(uploadObj);
      localStorage.setItem("uploadObj", JSON.stringify(uploadObj));
      history.push("multistep/step2img");
      return;
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  // 셀렉터 선택
  const typeSelected = (e: any) => {
    uploadObj.type = e.target.value;
    setTypes(e.target.value);
    setValue("type", e.target.value);
  };

  const input = useReactiveVar(inputVar);

  const onSubmit = async (data: any) => {
    if (types === "imggame") {
      if (Object.keys(errors).length === 0) {
        uploadObj.title = data.title;
        uploadObj.desc = data.desc;
        uploadObj.type = data.type;
        localStorage.setItem("uploadObj", JSON.stringify(uploadObj));
        inputVar({ ...input, step1clear: true });
        await uploadContent({
          variables: {
            title: uploadObj.title,
            desc: uploadObj.desc,
          },
        });
      }
      return;
    }
    if (types === "textgame") {
      if (Object.keys(errors).length !== 0) {
        return;
      } else {
        uploadObj.title = data.title;
        uploadObj.desc = data.desc;
        uploadObj.type = data.type;
        (uploadObj.textTest = [
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
        ]),
          localStorage.setItem("uploadObj", JSON.stringify(uploadObj));
        inputVar({ ...input, step1clear: true });
        history.push("multistep/step2text");
      }
      return;
    }
  };
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8} className="bg-light rounded">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>제목</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="제목을 작성해주세요"
                  {...register("title", { required: true, minLength: 5 })}
                  defaultValue={uploadObj.title}
                />
                {errors.title && "제목은 5글자 이상으로 작성해주세요"}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>설명</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  placeholder="설명"
                  {...register("desc", { required: true, minLength: 5 })}
                  defaultValue={uploadObj.desc}
                />
                {errors.desc && "설명은 5글자 이상으로 작성해주세요"}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="types">
                <Form.Label>Types</Form.Label>
                <Form.Control
                  as="select"
                  {...register("type")}
                  onChange={typeSelected}
                  custom
                >
                  <option value="imggame">이상형 월드컵</option>
                  <option value="textgame">밸런스게임</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Button block variant="dark" type="submit" size="lg">
              Next Step
            </Button>
          </Form>
        </Col>
      </Row>
      {/* <Comment />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem /> */}
    </>
  );
};

export default Step1;
