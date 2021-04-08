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
  const [displays, setDisplays] = useState([] as any);
  const [scores, setScores] = useState([] as any);

  const { loading } = useQuery(GET_CONTENTS, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: (data) => {
      const questions = [...data.getContent.question];
      console.log(questions[0]);
      setDisplays(questions);
    },
  });

  const clickHandler = (pick: any) => {
    setScores([pick]);
  };
  return (
    <>
      <Container fluid>
        <div>밸런스게임</div>
        {displays.map((d: any) => {
          return (
            <Card
              key={d.id}
              onClick={() => clickHandler(d)}
              style={
                displays.length === 1 ? { width: "100%" } : { width: "50%" }
              }
            >
              <Card.Text>{d.questionBody}</Card.Text>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default TextGame;
