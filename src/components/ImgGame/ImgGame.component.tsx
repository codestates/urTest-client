import React, { useState } from "react";
import { Container, Card, CardDeck, Modal, Button } from "react-bootstrap";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { ShareFill, Heart, Trophy } from "react-bootstrap-icons";
import jwt from "jsonwebtoken";

const ImgGame = (props: any) => {
  // 전역 변수
  const isLogin = useReactiveVar(isLoginVar);
  const location = useLocation();

  // 쿼리
  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
        bookMarks {
          userId
        }
        title
        photos {
          id
          photoUrl
          photoName
          winCount
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

  const POST_BOOKMARK = gql`
    mutation addBookMark($id: Int!) {
      addBookMark(id: $id) {
        ok
        error
      }
    }
  `;
  const [addBookMark] = useMutation(POST_BOOKMARK);
  const [addCountPhoto] = useMutation(POST_WINCOUNT);

  const [Data, setData] = useState([] as any);
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(true);
  const [title, setTitle] = useState([] as any);
  const [img, setImg] = useState([] as any[]);
  const [displays, setDisplays] = useState([] as any[]);
  const [winners, setWinners] = useState([] as any[]);
  const [rounds, setRounds] = useState(0 as any);
  const [user, setUser] = useState([] as any);
  const [transition, setTransiton] = useState(false);

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
      setUser(data.getContent.bookMarks);
    },
  });

  const clickHandler = (pick: any) => {
    if (img.length <= 2) {
      if (winners.length === 0) {
        console.log(pick.id);
        setRounds("우승");
        setDisplays([pick]);
        setTimeout(() => setTransiton(true), 500);
        setTimeout(() => setTransiton(false), 1000);
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
        setDisplays([pick]);
        setTimeout(() => setTransiton(true), 500);
        setTimeout(() => setTransiton(false), 1000);
        setTimeout(() => setDisplays([updateImg[0], updateImg[1]]), 2000);
        setWinners([]);
        return;
      }
    } else if (img.length > 2) {
      setWinners([...winners, pick]);
      setDisplays([pick]);
      setTimeout(() => setTransiton(true), 500);
      setTimeout(() => setTransiton(false), 1000);
      setTimeout(() => setDisplays([img[2], img[3]]), 2000);
      setImg(img.slice(2));
      return;
    }
  };

  const copyHandler = () => {
    alert(`http://localhost:3000${location.pathname}`);
  };

  const bookMarkBtnHandler = () => {
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
    let used = false;
    user.map((el: any) => {
      if (el.userId === userId) {
        used = true;
        return alert("이미 추가된 컨텐츠 입니다.");
      }
      used = false;
      return;
    });
    if (used === false) {
      addBookMark({
        variables: {
          id: +props.gameid,
        },
      });
      alert("즐겨찾기가 추가되었습니다.");
      // 즐겨찾기로 보내기
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
            <Button variant="outline-Light" onClick={bookMarkBtnHandler}>
              {<Heart />}
            </Button>
            <LinkContainer to={`/analytics/${+props.gameid}/`}>
              <Button variant="outline-Light">
                <Trophy />
              </Button>
            </LinkContainer>
            <Button variant="outline-Light">
              <ShareFill onClick={() => copyHandler()} />
            </Button>
            <Button variant="primary" onClick={() => modalHandler()}>
              시작하기
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : (
        <Container className="mt-5">
          <h1 className="header-text">
            {title}{" "}
            {rounds === "우승"
              ? "우승"
              : rounds === 1
              ? `결승`
              : `${rounds * 2}강 ${winners.length + 1} / ${rounds}`}
          </h1>
          <CardDeck
            className={displays.length === 1 ? "card-deck-transition" : ""}
          >
            {displays.map((d) => {
              return (
                <Card
                  key={d.id}
                  onClick={() => clickHandler(d)}
                  className="card-size"
                  style={{ backgroundColor: "#ddd", borderColor: "#ddd" }}
                >
                  <Card.Header className="card-header">
                    {d.photoName}{" "}
                    {displays.length === 1 ? `우승 횟수 : ${d.winCount}승` : ""}
                  </Card.Header>
                  <Card.Img
                    src={d.photoUrl}
                    alt=""
                    className={transition ? "card-img-transition" : "card-img"}
                  />
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
