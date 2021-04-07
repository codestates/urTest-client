/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useReactiveVar, useMutation, gql } from "@apollo/client";
import {
  inputVar,
  textUploadTable,
  textUploadHeaders,
} from "../../common/graphql/client";
import { Form, Button, Col, Row } from "react-bootstrap";
import Previews from "./Dropzone";
import BootstrapTable from "react-bootstrap-table-next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import Comment from "../Comment/Comment.component";
import CommentItem from "../Comment/CommentItem.component";
import { time_ranges_to_array } from "svelte/internal";
import { isConstructorDeclaration } from "typescript";
import { Cone } from "react-bootstrap-icons";

const UPLOAD_CONTENT = gql`
  mutation uploadContent($title: String, $desc: String, $files: [Upload]) {
    uploadContent(title: $title, desc: $desc, files: $files) {
      createdAt
      desc
      id
      photos {
        contentId
        id
      }
      title
    }
  }
`;

const Step1 = () => {
  const history = useHistory();
  const [types, setTypes] = useState("imgGame");
  const [uploadContent] = useMutation(UPLOAD_CONTENT, {
    onCompleted: (data) => {
      console.log(data);
      return;
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const typeSelected = (e: any) => {
    setTypes(e.target.value);
    inputVar({ ...input, types: e.target.value });
    setValue("types", e.target.value);
  };
  // const onAfterSave = (data: any) => {
  //   console.log(data);
  //   // history.push("multistep/stepResult");
  // };
  const input = useReactiveVar(inputVar);
  const testTexts = useReactiveVar(textUploadTable);
  const columns = useReactiveVar(textUploadHeaders);
  const onSubmit = (data: any) => {
    console.log(input.files);
    if (input.types === "imgGame") {
      if (Object.keys(errors).length === 0) {
        if (input.files.length < 8) {
          inputVar({ ...inputVar(), files: [] });
          return alert("이상형월드컵은 최소 8장 이상의 파일이 필요합니다");
        }
        const { files, ...contentData } = data;
        inputVar({ ...input, ...contentData, step1clear: true });
        uploadContent({
          variables: {
            title: inputVar().title,
            desc: inputVar().desc,
            files: inputVar().files,
          },
        });
        history.push("multistep/step2img");
      }
      return;
    }
    if (input.types === "textGame") {
      const textArr: any = [];
      testTexts.map((row) => {
        if (row.question !== "" && row.answer1 !== "" && row.answer2 !== "") {
          textArr.push([row.question, row.answer1, row.answer2]);
        }
      });
      if (textArr.length < 4 || 16 < textArr.length) {
        return alert("문항수는 4~16개입니다");
      }
      if (Object.keys(errors).length !== 0) {
        return;
      } else {
        inputVar({ ...input, ...data });
        textArr.map((row: any) => {
          // inputVar().testText?.push(row);
        });
        inputVar({ ...input, step1clear: true });
        textUploadTable([
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
        history.push("multistep/step2text");
      }
      return;
    }
  };
  // addTodo({
  //   variables: { files: input.files, title: input.title, desc: input.desc },
  // });
  // history.push("multistep/step2");
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
                  defaultValue={input.title}
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
                  defaultValue={input.desc}
                />
                {errors.desc && "설명은 5글자 이상으로 작성해주세요"}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="types">
                <Form.Label>Types</Form.Label>
                <Form.Control
                  as="select"
                  {...register("types")}
                  onChange={typeSelected}
                  custom
                >
                  <option value="imgGame">이상형 월드컵</option>
                  <option value="textGame">밸런스게임</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            {types === "imgGame" ? (
              <Previews {...register("files")} defaultValue={input.files} />
            ) : (
              <>
                <BootstrapTable
                  keyField="id"
                  data={testTexts}
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
            )}
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
