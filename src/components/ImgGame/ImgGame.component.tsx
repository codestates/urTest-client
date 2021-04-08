import React, { useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

const ImgGame = () => {
  // 쿼리
  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
        photos {
          id
          photoUrl
          photoName
        }
      }
    }
  `;
  const [img, setImg] = useState([] as any[]);
  const [displays, setDisplays] = useState([] as any[]);
  const [winners, setWinners] = useState([] as any[]);
  const [rounds, setRounds] = useState(0 as any);

  const { loading } = useQuery(GET_CONTENTS, {
    variables: {
      id: 2,
    },
    onCompleted: (data) => {
      const item = [...data.getContent.photos];
      item.sort(() => Math.random() - 0.5);
      setImg(item);
      setDisplays([item[0], item[1]]);
      setRounds(item.length / 2);
    },
  });

  const clickHandler = (pick: any) => {
    if (img.length <= 2) {
      if (winners.length === 0) {
        setRounds("우승");
        setDisplays([pick]);
      } else {
        const updateImg = [...winners, pick];
        setRounds(updateImg.length / 2);
        setImg(updateImg);
        setDisplays([updateImg[0], updateImg[1]]);
        setWinners([]);
      }
    } else if (img.length > 2) {
      setWinners([...winners, pick]);
      setDisplays([img[2], img[3]]);
      setImg(img.slice(2));
    }
  };
  return (
    <>
      {loading ? (
        "isLoading................................................................."
      ) : (
        <Container fluid>
          <h1 className="title">
            {rounds === "우승"
              ? "우승"
              : rounds === 1
              ? `결승`
              : `${rounds * 2}강 ${winners.length + 1} / ${rounds}`}
          </h1>
          <Col>
            <Row>
              {displays.map((d) => {
                return (
                  <Card
                    key={d.id}
                    onClick={() => clickHandler(d)}
                    style={
                      displays.length === 1
                        ? { width: "100%" }
                        : { width: "50%" }
                    }
                  >
                    <Card.Img
                      src={d.photoUrl}
                      alt=""
                      style={{ height: "800px" }}
                    />
                    <Card.Text>{d.photoName}</Card.Text>
                  </Card>
                );
              })}
            </Row>
          </Col>
        </Container>
      )}
    </>
  );
};

export default ImgGame;
