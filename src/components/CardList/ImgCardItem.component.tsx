import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const ImgCardItem = ({ d }: any) => {
  const ADD_VIEWS = gql`
    mutation addViews($id: Int!) {
      addViews(id: $id) {
        ok
        error
      }
    }
  `;
  const [addViews] = useMutation(ADD_VIEWS);
  const [hasPhotos, setHasPhotos] = useState(false as boolean);
  useEffect(() => {
    if (d?.photos) {
      setHasPhotos(true);
    } else {
      setHasPhotos(false);
    }
  }, []);
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
              {hasPhotos ? (
                <>
                  <div className="img-box">
                    <img src={d?.photos[0]?.photoUrl} alt="img" />
                    <img src={d?.photos[1]?.photoUrl} alt="img" />
                  </div>
                </>
              ) : (
                <></>
              )}
              <p>{d.title}</p>
              <span>{d.desc}</span>
            </div>
          </div>
        </LinkContainer>
      </Container>
    </Col>
  );
};

export default ImgCardItem;
