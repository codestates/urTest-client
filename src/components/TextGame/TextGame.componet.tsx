import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Container, Card, CardDeck } from "react-bootstrap";

const TextGame = (props: any) => {
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
    const nextQuestions = [...questions];
    nextQuestions.shift();
    setQuestions(nextQuestions);
    setAnswers([nextQuestions[0].answer[0], nextQuestions[0].answer[1]]);
  };

  return (
    <>
      {questions.length === 0 ? (
        "loading..."
      ) : (
        <Container>
          <CardDeck>
            {questions[0].questionBody}
            {answers.map((pick: any) => {
              return (
                <Card key={pick.id} onClick={() => clickHandler(pick)}>
                  <Card.Text>{pick.body}</Card.Text>
                  <Card.Text>{`선택률 ${
                    (pick.winCount /
                      (answers[0].winCount + answers[1].winCount)) *
                    100
                  }%`}</Card.Text>
                </Card>
              );
            })}
          </CardDeck>
        </Container>
      )}
    </>
  );
};

export default TextGame;
