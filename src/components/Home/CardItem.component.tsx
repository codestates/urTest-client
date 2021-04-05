import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import apple from "../../img/apple.jpg";
import berries from "../../img/berries.jpg";

const CardItem = ({ d }: any) => {
  return (
    <>
      <Card style={{ width: "18rem", height: "27rem" }} className="mt-1">
        <Card.Body>
          <Row>
            <Card.Img
              src={apple}
              style={{ height: "15rem", width: "5rem" }}
              className="col pr-0 mb-4"
            />
            <Card.Img
              src={berries}
              style={{ height: "15rem", width: "5rem" }}
              className="col pl-0 mb-4"
            />
          </Row>
          <Card.Title className="mt-5" style={{ textAlign: "right" }}>
            과일 월드컵
          </Card.Title>
          <Button variant="dark" className="mb-3" style={{ float: "right" }}>
            시작하기
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardItem;
