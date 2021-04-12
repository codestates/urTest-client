import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import "moment/locale/ko"; // 이줄 추가
const CommentItem = (props: any) => {
  const { handleCommentDelete } = props;
  return (
    <>
      <Row>
        <Col>
          <Card className=" my-2">
            <div className="border p-2">
              <Row className="m-0">
                <div className="w-100">
                  <p className="my-2">{props.desc}</p>
                </div>
                <p className="small m-0 mt-1 mr-3">익명</p>
                <p className="small text-secondary m-0 mt-1">
                  {moment(+props.updatedAt).fromNow()}
                </p>
                <div className="flex-grow-1 pl-2">
                  <Button
                    as="input"
                    type="button"
                    variant="secondary"
                    value="삭제"
                    size="sm"
                    className="mb-2  float-right"
                    style={{ fontSize: "0.5rem" }}
                    onClick={() => {
                      handleCommentDelete(props.id, props.password);
                    }}
                  />
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
