import React, { useEffect, useState } from "react";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Container, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import {
  Heart,
  ShareFill,
  Trophy,
  CaretRightSquareFill,
  HeartFill,
} from "react-bootstrap-icons";

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
              {hasQuestions ? (
                <>
                  <div className="content-box">
                    <div className="start-game">
                      <div>
                        <CaretRightSquareFill />
                      </div>
                    </div>
                    <div className="answer-box">
                      <h5 className="question-body">
                        {d.question[0].questionBody}
                      </h5>
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
                <div className="icon-box">
                  <Heart />
                  <Trophy />
                  <ShareFill />
                </div>
                {/* <div style={{ textAlign: "left" }}>
                  {isLogin ? (
                    bookMark ? (
                      <AwesomeButton type="link" className="m-1">
                        <Button
                          variant="urtest"
                          onClick={() => deleteBookMarkBtnHandler()}
                        >
                          <HeartFill />
                        </Button>
                      </AwesomeButton>
                    ) : (
                      <AwesomeButton type="primary" className="m-1">
                        <Button
                          variant="urtest"
                          onClick={() => bookMarkBtnHandler()}
                        >
                          <Heart />
                        </Button>
                      </AwesomeButton>
                    )
                  ) : (
                    <LinkContainer to="/login">
                      <AwesomeButton type="primary" className="m-1">
                        <Button variant="urtest">
                          <Heart />
                        </Button>
                      </AwesomeButton>
                    </LinkContainer>
                  )}
                  <LinkContainer to={`/analytics/${+props.gameid}/`}>
                    <AwesomeButton type="primary" className="m-1">
                      <Button variant="urtest">
                        <Trophy />
                      </Button>
                    </AwesomeButton>
                  </LinkContainer>
                  <AwesomeButton type="primary" className="m-1">
                    <CopyToClipboard
                      text={`https://urtest.shop${location.pathname}`}
                      onCopy={() => copyHandler()}
                    >
                      <Button variant="urtest">
                        <ShareFill />
                      </Button>
                    </CopyToClipboard>
                  </AwesomeButton>
                  {share ? <span> 클립보드에 복사되었습니다.</span> : ""}
                </div> */}
              </div>
            </div>
          </div>
        </LinkContainer>
      </Container>
    </Col>
  );
};

export default TextCardItem;
