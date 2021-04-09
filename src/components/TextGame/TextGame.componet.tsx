import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Col, Row, Card } from "react-bootstrap";

const TextGame = (props: any) => {
  console.log(props.gameid);
  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
        question {
          id
          questionBody
          answer {
            body
          }
        }
      }
    }
  `;

  const [question, setQuestion] = useState([] as any);

  const {} = useQuery(GET_CONTENTS, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: (data) => {
      const questions = [...data.getContent.question];
      setQuestion(questions);
    },
  });

  const clickHandler = () => {
    question.shift();
    const nextQuestions = [...question];
    setQuestion(nextQuestions);
  };

  return (
    <>
      {question.length === 0 ? (
        "loading..."
      ) : (
        <Container fluid>
          <div>밸런스게임</div>
          <h1 key={question[0].id}>
            {question[0].questionBody}
            <Row>
              <Col>
                <Card
                  style={{ height: "780px", width: "100%" }}
                  onClick={() => clickHandler()}
                >
                  {question[0].answer[0].body}
                </Card>
              </Col>
              <Col>
                <Card
                  style={{ height: "780px", width: "100%" }}
                  onClick={() => clickHandler()}
                >
                  {question[0].answer[1].body}
                </Card>
              </Col>
            </Row>
          </h1>
        </Container>
      )}
    </>
  );
};

export default TextGame;
