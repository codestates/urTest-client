import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const CardItem = ({ d }: any) => {
  return (
    <Card border="primary">
      {/* <Card.Img
        variant="top"
        src={place.image.small}
        className="tour-card-image"
      /> */}
      <Card.Body>
        <Card.Subtitle className="mb-2">{d.name}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Row className="mt-3">
          <Col className="tour-pointer">
            <i className="fas fa-map-marker-alt tour-icons" />
          </Col>
          <Col className="tour-pointer">
            <i className="fas fa-calendar tour-icons" />
          </Col>
        </Row>
        <Row>
          <Col className="tour-pointer">
            <i className="fas fa-flag tour-icons" />
          </Col>
          <Col className="tour-pointer">
            <i className="fas fa-user tour-icons" />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row noGutters={true}>
          <Col className="flex-column">
            <Col></Col>
            <Col className="d-inline text-nowrap"></Col>
          </Col>
          <Col className="align-self-center">
            <Button
              variant="primary"
              size="sm"
              block
              className="btn-details"
              type="submit"
            >
              Details
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default CardItem;
