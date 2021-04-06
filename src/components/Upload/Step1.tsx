/* eslint-disable react/prop-types */
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { inputVar } from "../../common/graphql/client";
import { Form, Button, Col, Row } from "react-bootstrap";
import Previews from "./Dropzone";
import Comment from "../Comment/Comment.component";

// const ADD_CONTENT = gql`
//   mutation UploadContent($title: String, $desc: String, $files: [Upload]) {
//     uploadContent(title: $title, desc: $desc, files: [$files] }) {
//       ok
//       error
//     }
//   }
// `;

const Step1 = () => {
  const history = useHistory();
  // const [addTodo, { data }] = useMutation(ADD_CONTENT);

  const { register, handleSubmit } = useForm();
  const input = useReactiveVar(inputVar);
  const onSubmit = (data: any) => {
    inputVar({ ...input, ...data });
    console.log(input);
    inputVar({ ...input, step1clear: true });
    // addTodo({
    //   variables: { files: input.files, title: input.title, desc: input.desc },
    // });
    history.push("multistep/step2");
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
                  {...register("title")}
                  defaultValue={input.title}
                />
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
                  {...register("desc")}
                  defaultValue={input.desc}
                />
              </Form.Group>
            </Form.Row>

            <Previews {...register("files")} defaultValue={input.files} />
            <Form.Row>
              <Col>
                <Button block variant="dark" type="submit" size="lg">
                  Next Step
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Comment />
    </>
  );
};

export default Step1;
