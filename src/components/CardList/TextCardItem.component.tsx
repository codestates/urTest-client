import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const TextCardItem = ({ d }: any) => {
  const ADD_VIEWS = gql`
    mutation addViews($id: Int!) {
      addViews(id: $id) {
        ok
        error
      }
    }
  `;
  const [addViews] = useMutation(ADD_VIEWS);

  return (
    <Col>
      <Container>
        <LinkContainer
          to={`/${d.type}/${d.id}`}
          onClick={() => {
            addViews({
              variables: {
                id: d.id,
              },
            });
          }}
        >
          <div
            className={location.pathname === "/" ? "home-cards front" : "front"}
          >
            <div className="inner header-items">
              <p>{d.title}</p>
              <span>{d.desc}</span>
            </div>
          </div>
        </LinkContainer>
      </Container>
    </Col>
  );
};

export default TextCardItem;
