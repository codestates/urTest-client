import React, { useState } from "react";
import { Container, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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
            <p>{d.title}</p>
            <span>{d.desc}</span>
          </div>
        </div>
        <LinkContainer to="/imggame">
          <div
            className="back"
            style={{ backgroundImage: `url("https://unsplash.it/500/500/")` }}
          >
            <div className="inner">
              <p>{d.desc}</p>
            </div>
          </div>
        </LinkContainer>
      </Container>
    </Col>
  );
};

export default CardItem;
