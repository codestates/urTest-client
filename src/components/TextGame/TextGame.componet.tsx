import React, { useState } from "react";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Card, CardDeck, Button, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ShareFill, Heart, Trophy } from "react-bootstrap-icons";
import jwt from "jsonwebtoken";

const TextGame = (props: any) => {
  // 전역 변수
  const isLogin = useReactiveVar(isLoginVar);
  const location = useLocation();

  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
        bookMarks {
          userId
        }
        question {
          id
          questionBody
          answer {
            id
            body
            winCount
          }
        }
      }
    }
  `;

  const POST_TEXT = gql`
    mutation addCountTxt($id: Int!) {
      addCountTxt(id: $id) {
        ok
        error
      }
    }
  `;

  const POST_BOOKMARK = gql`
    mutation addBookMark($id: Int!) {
      addBookMark(id: $id) {
        ok
        error
      }
    }
  `;

  const POST_DELETEBOOKMARK = gql`
    mutation deleteBookMark($id: Int!) {
      deleteBookMark(id: $id) {
        ok
        error
      }
    }
  `;

  const [addCountTxt] = useMutation(POST_TEXT);
  const [addBookMark] = useMutation(POST_BOOKMARK);
  const [deleteBookMark] = useMutation(POST_DELETEBOOKMARK);

  const [questions, setQuestions] = useState([] as any);
  const [answers, setAnswers] = useState([] as any);
  const [rating, setRating] = useState(false);
  const [lastPick, setLastPick] = useState(false);
  const [bookMark, setBookMark] = useState(Boolean);
  const [userBookMark, setUserBookMark] = useState([] as any);

  useQuery(GET_CONTENTS, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: (data) => {
      setQuestions(data.getContent.question);
      setAnswers([
        data.getContent.question[0].answer[0],
        data.getContent.question[0].answer[1],
      ]);
      setUserBookMark(data.getContent.bookMarks);
      if (isLogin) {
        const token = localStorage.getItem("token");
        const userId = jwt.verify(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          token,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          process.env.REACT_APP_SECRET_KEY,
          function (err: any, decoded: any) {
            return decoded.id;
          }
        );
        data.getContent.bookMarks.map((el: any) => {
          if (el.userId === userId) {
            setBookMark(true);
          }
        });
      }
    },
  });

  const clickHandler = (pick: any) => {
    addCountTxt({
      variables: {
        id: pick.id,
      },
    });
    if (questions.length === 1) {
      setRating(false);
      setLastPick(true);
      return;
    }
    const nextQuestions = [...questions];
    nextQuestions.shift();
    setQuestions(nextQuestions);
    setAnswers([nextQuestions[0].answer[0], nextQuestions[0].answer[1]]);
    setRating(false);
    return;
  };

  const ratingHandler = () => {
    if (!rating) {
      setRating(true);
      return;
    }
    setRating(false);
    return;
  };

  const copyHandler = () => {
    alert(`https:urtest.shop${location.pathname}`);
  };

  const bookMarkBtnHandler = () => {
    addBookMark({
      variables: {
        id: +props.gameid,
      },
    });
    alert("즐겨찾기가 추가 되었습니다.");
    setBookMark(true);
    return;
  };

  const deleteBookMarkBtnHandler = () => {
    let result;
    const token = localStorage.getItem("token");
    const userId = jwt.verify(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      token,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      process.env.REACT_APP_SECRET_KEY,
      function (err: any, decoded: any) {
        return decoded.id;
      }
    );
    userBookMark.map((el: any) => {
      if (el.userId === userId) {
        result = el.id;
      }
    });
    deleteBookMark({
      variables: {
        id: result,
      },
    });
    alert("즐겨찾기가 삭제 되었습니다.");
    setBookMark(false);
    return;
  };

  return (
    <>
      {questions.length === 0 ? (
        "loading..."
      ) : (
        <Container>
          <div style={{ textAlign: "left" }}>
            {isLogin ? (
              bookMark ? (
                <Button variant="dark" onClick={deleteBookMarkBtnHandler}>
                  <Heart />
                </Button>
              ) : (
                <Button variant="outline-dark" onClick={bookMarkBtnHandler}>
                  <Heart />
                </Button>
              )
            ) : (
              <LinkContainer to="/login">
                <Button variant="outline-dark">
                  <Heart />
                </Button>
              </LinkContainer>
            )}
            <LinkContainer
              to={`/analytics/${+props.gameid}/`}
              style={{ margin: "4px" }}
            >
              <Button variant="outline-dark">
                <Trophy />
              </Button>
            </LinkContainer>
            <Button variant="outline-dark" onClick={() => copyHandler()}>
              <ShareFill />
            </Button>
          </div>
          {lastPick ? (
            <Card>
              <Card.Text>게임이 종료되었습니다.</Card.Text>
            </Card>
          ) : (
            <>
              <h1>{questions[0].questionBody}</h1>
              <Button onClick={() => ratingHandler()}>선택률 보기</Button>
              <CardDeck>
                {answers.map((pick: any) => {
                  return (
                    <Card
                      key={pick.id}
                      onClick={() => clickHandler(pick)}
                      className="card-size"
                    >
                      <Card.Text>{pick.body}</Card.Text>
                      {rating ? (
                        <Card.Text>{`선택률 ${(
                          (pick.winCount /
                            (answers[0].winCount + answers[1].winCount)) *
                          100
                        ).toFixed(2)}%`}</Card.Text>
                      ) : (
                        ""
                      )}
                    </Card>
                  );
                })}
              </CardDeck>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default TextGame;
