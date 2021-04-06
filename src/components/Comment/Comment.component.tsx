import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Comment = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log("submitted");
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={8} className="bg-light rounded">
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("commentBody")}
                defaultValue={""}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col>
              <Button block variant="dark" type="submit" size="lg">
                Comment
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Comment;
