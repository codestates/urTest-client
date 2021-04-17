import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Container } from "react-bootstrap";
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

  const [hasQuestions, setHasQuestions] = useState(false as boolean);
  useEffect(() => {
    if (d?.question) {
      setHasQuestions(true);
    } else {
      setHasQuestions(false);
    }
  }, []);
  return (
    <Container>
      {/* <LinkContainer
        to={`/${d.type}/${d.id}`}
        onClick={() => {
          addViews({
            variables: {
              id: d.id,
            },
          });
        }}
      > */}
      <div
        className={`tinder-card ${
          location.pathname === "/" ? "home-cards front" : "front"
        }`}
        style={{
          transform: `rotate(${Math.random() * (5 - -5) + -5}deg)`,
        }}
      >
        <div className="inner header-items">
          {hasQuestions ? (
            <>
              <div className="content-box">
                <div className="start-game">
                  <span>시작하기</span>
                </div>
                <div className="answer-box">
                  <span className="wordbreak">
                    {d.question[0]?.answer[0]?.body}
                  </span>
                  <span className="wordbreak">
                    {d.question[0]?.answer[1]?.body}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="text-header">
            <p>{d.title}</p>
            {/* <span>{d.desc}</span> */}
          </div>
        </div>
      </div>
      {/* </LinkContainer> */}
    </Container>
  );
};

export default TextCardItem;
