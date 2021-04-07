import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import apple from "../../img/apple.jpg";
import berries from "../../img/berries.jpg";
import ice_cream from "../../img/ice_cream.jpg";
import salmon from "../../img/salmon.jpg";
import cherry from "../../img/cherry.jpg";
import ddalgi from "../../img/ddalgi.jpg";
import kiwi from "../../img/kiwi.jpg";
import gul from "../../img/gul.jpg";

const items = [
  {
    name: "apple",
    src: apple,
  },
  {
    name: "berries",
    src: berries,
  },
  {
    name: "ice cream",
    src: ice_cream,
  },
  {
    name: "cherry",
    src: cherry,
  },
  {
    name: "ddalgi",
    src: ddalgi,
  },
  {
    name: "gul",
    src: gul,
  },
  {
    name: "kiwi",
    src: kiwi,
  },
  {
    name: "salmon",
    src: salmon,
  },
];

interface Items {
  name: string;
  src: any;
}

const ImgGame = () => {
  const [img, setImg] = useState([] as Items[]);
  const [displays, setDisplays] = useState([] as Items[]);
  const [winners, setWinners] = useState([] as Items[]);
  const [rounds, setRounds] = useState(0 as any);
  useEffect(() => {
    items.sort(() => Math.random() - 0.5);
    setImg(items);
    setDisplays([items[0], items[1]]);
    setRounds(items.length / 2);
  }, []);

  const clickHandler = (pick: Items) => {
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
                  key={d.name}
                  onClick={() => clickHandler(d)}
                  style={
                    displays.length === 1 ? { width: "100%" } : { width: "50%" }
                  }
                >
                  <Card.Img src={d.src} alt="" style={{ height: "800px" }} />
                  <Card.Text>{d.name}</Card.Text>
                </Card>
              );
            })}
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default ImgGame;
