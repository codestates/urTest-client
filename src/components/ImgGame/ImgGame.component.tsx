import React, { useState } from "react";
import { Container, Card, CardDeck, Modal, Button, Nav } from "react-bootstrap";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { LinkContainer } from "react-router-bootstrap";
const ImgGame = (props: any) => {
  // 전역 변수
  const isLogin = useReactiveVar(isLoginVar);

  // 쿼리
  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
        title
        photos {
          id
          photoUrl
          photoName
        }
      }
    }
  `;

  const POST_WINCOUNT = gql`
    mutation addCountPhoto($id: Int!) {
      addCountPhoto(id: $id) {
        ok
        error
      }
    }
  `;

  const [addCountPhoto] = useMutation(POST_WINCOUNT);

  const [Data, setData] = useState([] as any);
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(true);
  const [title, setTitle] = useState([] as any);
  const [img, setImg] = useState([] as any[]);
  const [displays, setDisplays] = useState([] as any[]);
  const [winners, setWinners] = useState([] as any[]);
  const [rounds, setRounds] = useState(0 as any);

  const modalHandler = () => {
    if (count === 0) {
      alert("라운드를 선택해주세요");
      return;
    }
    setStart(false);
    const item = [...Data.photos.slice(0, count)];
    item.sort(() => Math.random() - 0.5);
    setImg(item);
    setDisplays([item[0], item[1]]);
    setRounds(item.length / 2);
  };

  const fourCountHandler = () => {
    setCount(4);
  };

  const eightCountHandler = () => {
    setCount(8);
  };

  useQuery(GET_CONTENTS, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: (data) => {
      setData(data.getContent);
      setTitle(data.getContent.title);
    },
  });

  const clickHandler = (pick: any) => {
    if (img.length <= 2) {
      if (winners.length === 0) {
        console.log(pick.id);
        setRounds("우승");
        setDisplays([pick]);
        addCountPhoto({
          variables: {
            id: pick.id,
          },
        });
        return;
      } else {
        const updateImg = [...winners, pick];
        setRounds(updateImg.length / 2);
        setImg(updateImg);
        setDisplays([updateImg[0], updateImg[1]]);
        setWinners([]);
        return;
      }
    } else if (img.length > 2) {
      setWinners([...winners, pick]);
      setDisplays([img[2], img[3]]);
      setImg(img.slice(2));
      return;
    }
  };

  return (
    <>
      {start ? (
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>
              {title} {count}강
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={() => fourCountHandler()}>4강</Button>
            <Button onClick={() => eightCountHandler()}>8강</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => modalHandler()}>
              시작하기
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : (
        <Container>
          <Nav>
            {isLogin ? <Button>즐겨찾기</Button> : ""}
            <LinkContainer to={`/analytics/${+props.gameid}/`}>
              <Button>랭킹보기</Button>
            </LinkContainer>
            <Button>공유하기</Button>
          </Nav>
          <h1 className="neon">
            <p>{title}</p>
            {rounds === "우승"
              ? "우승"
              : rounds === 1
              ? `결승`
              : `${rounds * 2}강 ${winners.length + 1} / ${rounds}`}
          </h1>
          <CardDeck>
            {displays.map((d) => {
              return (
                <Card
                  key={d.id}
                  onClick={() => clickHandler(d)}
                  className="card-size"
                >
                  <Card.Img
                    src={d.photoUrl}
                    alt=""
                    className="card-img"
                    style={{ width: "100%", height: "100%" }}
                  ></Card.Img>
                </Card>
              );
            })}
          </CardDeck>
        </Container>
      )}
    </>
  );
};

export default ImgGame;
