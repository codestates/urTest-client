import React, { useState } from "react";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Card, CardDeck, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ShareFill, Heart, HeartFill, Trophy } from "react-bootstrap-icons";
import jwt from "jsonwebtoken";
import SweetAlert from "react-bootstrap-sweetalert";
import { Fade } from "react-awesome-reveal";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

const TextGame = (props: any) => {
  // 전역 변수
  const isLogin = useReactiveVar(isLoginVar);
  const location = useLocation();

  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
        bookMarks {
          id
          userId
          contentId
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
  const [addBookMark] = useMutation(POST_BOOKMARK, {
    onCompleted: async () => {
      return refetch();
    },
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: {
          id: +props.gameid,
        },
      },
    ],
    awaitRefetchQueries: true,
  });
  const [deleteBookMark] = useMutation(POST_DELETEBOOKMARK);

  const [questions, setQuestions] = useState([] as any);
  const [answers, setAnswers] = useState([] as any);
  const [rating, setRating] = useState(false);
  const [lastPick, setLastPick] = useState(false);
  const [bookMark, setBookMark] = useState(Boolean);
  const [userBookMark, setUserBookMark] = useState([] as any);
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const [doubleClick, setDoubleClick] = useState(true);

  const { refetch } = useQuery(GET_CONTENTS, {
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
    fetchPolicy: "cache-and-network",
  });

  const clickHandler = (pick: any) => {
    setDoubleClick(false);
    addCountTxt({
      variables: {
        id: pick.id,
      },
    });
    if (questions.length === 1) {
      setTimeout(() => {
        setRating(true);
      }, 100);
      setTimeout(() => {
        setRating(false);
      }, 1000);
      setTimeout(() => {
        setLastPick(true);
      }, 1000);
      setTimeout(() => {
        setDoubleClick(true);
      }, 1200);
      return;
    }
    const nextQuestions = [...questions];
    nextQuestions.shift();
    setTimeout(() => {
      setRating(true);
    }, 100);
    setTimeout(() => {
      setRating(false);
    }, 1000);
    setTimeout(() => {
      setQuestions(nextQuestions);
    }, 1000);
    setTimeout(() => {
      setAnswers([nextQuestions[0].answer[0], nextQuestions[0].answer[1]]);
    }, 1000);
    setTimeout(() => {
      setDoubleClick(true);
    }, 1200);

    return;
  };

  const copyHandler = () => {
    setSweetAlertShow(true);
  };

  const bookMarkBtnHandler = () => {
    addBookMark({
      variables: {
        id: +props.gameid,
      },
    });
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
      if (el.userId === userId && el.contentId === +props.gameid) {
        result = el.id;
      }
    });
    deleteBookMark({
      variables: {
        id: result,
      },
    });
    setBookMark(false);
    return;
  };

  return (
    <>
      <SweetAlert
        show={sweetAlertShow}
        showConfirm={false}
        success
        title="클립보드에 복사되었습니다."
        onConfirm={() => {
          setSweetAlertShow(false);
          return;
        }}
        onCancel={() => {
          setSweetAlertShow(false);
          return;
        }}
      >{`https://urtest.shop${location.pathname}`}</SweetAlert>
      {questions.length === 0 ? (
        "loading..."
      ) : (
        <Container>
          <div style={{ textAlign: "left" }}>
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
                  <Button variant="urtest" onClick={() => bookMarkBtnHandler()}>
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
          </div>
          <h1 className="textgame-title font-jua m-5">
            {questions[0].questionBody}
          </h1>
          <CardDeck>
            {answers.map((pick: any) => {
              return (
                <Card
                  key={pick.id}
                  onClick={() =>
                    doubleClick ? clickHandler(pick) : console.log(doubleClick)
                  }
                >
                  <Card.Body>
                    <Card.Text className="textgame-answer">
                      {pick.body}
                    </Card.Text>
                    {rating ? (
                      <Fade>
                        <Card.Text
                          style={{ color: "red", textAlign: "center" }}
                        >{`선택률 ${(
                          (pick.winCount /
                            (answers[0].winCount + answers[1].winCount)) *
                          100
                        ).toFixed(0)}%`}</Card.Text>
                      </Fade>
                    ) : (
                      ""
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </CardDeck>
          {lastPick ? (
            <div className="mt-4" style={{ textAlign: "center" }}>
              게임이 종료되었습니다.
              <div className="mt-4">
                <LinkContainer to={`/textgame/${+props.gameid}/`}>
                  <AwesomeButton type="primary" className="m-1">
                    <Button variant="urtest">다시하기</Button>
                  </AwesomeButton>
                </LinkContainer>
                <LinkContainer to={`/analytics/${+props.gameid}/`}>
                  <AwesomeButton type="primary" className="m-1">
                    <Button variant="urtest">랭킹보기</Button>
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
              </div>
            </div>
          ) : (
            ""
          )}
        </Container>
      )}
    </>
  );
};

export default TextGame;
