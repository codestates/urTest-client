import React from "react";
import {
  Card,
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
const CommentItem = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8} className="bg-light rounded">
          <Card className=" mt-4">
            <div className="border p-2">
              <Row className="m-0">
                <div className="">
                  <p className="my-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras turpis sem, dictum id bibendum eget, malesuada ut
                    massa. Ut scel erisque nulla sed luctus dapibus. Nulla sit
                    amet mi vitae purus sol licitudin venenatis. Praesent et sem
                    urna. Integer vitae lectus nis l. Fusce sapien ante,
                    tristique efficitur lorem et, laoreet ornare lib ero. Nam
                    fringilla leo orci. Vivamus semper quam nunc, sed ornare
                    magna dignissim sed. Etiam interdum justo quis risus
                    efficitur dictum. Nunc ut pulvinar quam. N unc mollis, est a
                    dapibus dignissim, eros elit tempor diam, eu tempus quam
                    felis eu velit.
                  </p>
                </div>
                <p className="small text-secondary m-0 mt-1">1 day ago</p>
                <div className="flex-grow-1 pl-2">
                  <InputGroup size="sm" className="justify-content-end">
                    <Form.Label>
                      <FormControl
                        placeholder="password"
                        aria-label="comment-password"
                        aria-describedby="basic-addon2"
                        style={{ fontSize: "0.5rem" }}
                      />
                    </Form.Label>
                    <InputGroup.Append>
                      <Button
                        as="input"
                        type="button"
                        variant="secondary"
                        value="삭제"
                        size="sm"
                        className="mb-2"
                        style={{ fontSize: "0.5rem" }}
                      />
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CommentItem;
