import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Comment = (props: any) => {
  const { register, handleSubmit } = useForm();

  return (
    <Form onSubmit={handleSubmit(props.handleCommentAdd)}>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>
            댓글 달기
            <Form.Control
              type="text"
              placeholder="패스워드"
              {...register("password")}
              defaultValue={""}
            />
          </Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={3}
            placeholder="내용"
            {...register("desc")}
            defaultValue={""}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Col>
          <Button
            className="float-right"
            variant="dark"
            type="submit"
            size="sm"
          >
            댓글달기
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default Comment;
