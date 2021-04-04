import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const CardItem = ({ d }: any) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Col
      className={`${flipped ? "hover" : ""}`}
      onMouseEnter={() => {
        setFlipped(!flipped);
      }}
      onMouseLeave={() => {
        setFlipped(!flipped);
      }}
    >
      <Container>
        <div
          className="front"
          style={{ backgroundImage: `url("https://unsplash.it/500/500/")` }}
        >
          <div className="inner">
            <p>{d.name}</p>
            <span>Lorem ipsum</span>
          </div>
        </div>
        <div
          className="back"
          style={{ backgroundImage: `url("https://unsplash.it/500/500/")` }}
        >
          <div className="inner">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
              cum repellat velit quae suscipit c.
            </p>
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default CardItem;
