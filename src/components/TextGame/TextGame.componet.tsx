import React, { useState } from "react";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Card, CardDeck, Button, Nav } from "react-bootstrap";

const TextGame = (props: any) => {
  // 전역 변수
  const isLogin = useReactiveVar(isLoginVar);

  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
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

  const [addCountTxt] = useMutation(POST_TEXT);

  const [questions, setQuestions] = useState([] as any);
  const [answers, setAnswers] = useState([] as any);
  const [rating, setRating] = useState(false);
  const [lastPick, setLastPick] = useState(false);

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

  return (
    <>
      {questions.length === 0 ? (
        "loading..."
      ) : (
        <Container>
          <Nav>
            {isLogin ? <Button>즐겨찾기</Button> : ""}
            <LinkContainer to="/">
              <Button>랭킹보기</Button>
            </LinkContainer>
            <Button>공유하기</Button>
          </Nav>
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
