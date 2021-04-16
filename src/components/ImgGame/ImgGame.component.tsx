import React, { useState, useEffect } from "react";
import { Container, Card, CardDeck, Modal, Button } from "react-bootstrap";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { ShareFill, Heart, Trophy } from "react-bootstrap-icons";
import jwt from "jsonwebtoken";

const ImgGame = (props: any) => {
  // 전역 변수
  const location = useLocation();
  const isLogin = useReactiveVar(isLoginVar);

  // 쿼리
  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
        bookMarks {
          id
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

  const POST_DELETEBOOKMARK = gql`
    mutation deleteBookMark($id: Int!) {
      deleteBookMark(id: $id) {
        ok
        error
      }
    }
  `;

  const [addBookMark] = useMutation(POST_BOOKMARK);
  const [deleteBookMark] = useMutation(POST_DELETEBOOKMARK);
  const [addCountPhoto] = useMutation(POST_WINCOUNT);

  const [Data, setData] = useState([] as any);
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(true);
  const [title, setTitle] = useState([] as any);
  const [img, setImg] = useState([] as any[]);
  const [displays, setDisplays] = useState([] as any[]);
  const [winners, setWinners] = useState([] as any[]);
  const [rounds, setRounds] = useState(0 as any);
  const [transition, setTransiton] = useState(false);
  const [doubleClick, setDoubleClick] = useState(true);
  const [bookMark, setBookMark] = useState(Boolean);
  const [userBookMark, setUserBookMark] = useState([] as any);

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

  const { refetch } = useQuery(GET_CONTENTS, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: (data) => {
      setData(data.getContent);
      setTitle(data.getContent.title);
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
    setDoubleClick(false);
    if (img.length <= 2) {
      if (winners.length === 0) {
        console.log(pick.id);
        setRounds("우승");
        setDisplays([pick]);
        setTimeout(() => setTransiton(true), 100);
        setTimeout(() => setTransiton(false), 600);
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
        setTimeout(() => setTransiton(true), 100);
        setTimeout(() => setTransiton(false), 600);
        setTimeout(() => setDisplays([updateImg[0], updateImg[1]]), 1000);
        setWinners([]);
        setTimeout(() => setDoubleClick(true), 1100);
        return;
      }
    } else if (img.length > 2) {
      setWinners([...winners, pick]);
      setDisplays([pick]);
      setTimeout(() => setTransiton(true), 100);
      setTimeout(() => setTransiton(false), 600);
      setTimeout(() => setDisplays([img[2], img[3]]), 1000);
      setImg(img.slice(2));
      setTimeout(() => setDoubleClick(true), 1100);
      return;
    }
  };

  const copyHandler = () => {
    alert(`https://urtest.shop${location.pathname}`);
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
      {start ? (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              {title} {count}강
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              variant="outline-dark"
              onClick={() => fourCountHandler()}
              style={{ margin: "4px" }}
            >
              4강
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => eightCountHandler()}
              style={{ margin: "4px" }}
            >
              8강
            </Button>
          </Modal.Body>
          <Modal.Footer>
            {isLogin ? (
              bookMark ? (
                <Button
                  variant="dark"
                  onClick={deleteBookMarkBtnHandler}
                  style={{ margin: "4px" }}
                >
                  <Heart />
                </Button>
              ) : (
                <Button
                  variant="outline-dark"
                  onClick={bookMarkBtnHandler}
                  style={{ margin: "4px" }}
                >
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
            <LinkContainer to={`/analytics/${+props.gameid}/`}>
              <Button variant="outline-dark">
                <Trophy />
              </Button>
            </LinkContainer>
            <Button variant="outline-dark" onClick={() => copyHandler()}>
              <ShareFill />
            </Button>
            <Button variant="outline-dark" onClick={() => modalHandler()}>
              시작하기
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : (
        <Container className="mt-5">
          <h1 className="header-text mb-3">
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
                  onClick={
                    doubleClick
                      ? () => clickHandler(d)
                      : () => console.log(doubleClick)
                  }
                  className="card-size"
                >
                  <Card.Text className="card-text-font">
                    {d.photoName}{" "}
                    {displays.length === 1 ? `우승 횟수 : ${d.winCount}승` : ""}
                  </Card.Text>
                  <Card.Img
                    src={d.photoUrl}
                    alt=""
                    className={transition ? "card-img-transition" : "card-img"}
                  />
                </Card>
              );
            })}
          </CardDeck>
          {rounds === "우승" ? (
            <div style={{ textAlign: "center" }}>
              {isLogin ? (
                bookMark ? (
                  <Button
                    variant="dark"
                    onClick={deleteBookMarkBtnHandler}
                    style={{ margin: "4px" }}
                  >
                    <Heart />
                  </Button>
                ) : (
                  <Button
                    variant="outline-dark"
                    onClick={bookMarkBtnHandler}
                    style={{ margin: "4px" }}
                  >
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
              <LinkContainer to={`/analytics/${+props.gameid}/`}>
                <Button variant="outline-dark">
                  <Trophy />
                </Button>
              </LinkContainer>
              <Button variant="outline-dark" onClick={() => copyHandler()}>
                <ShareFill />
              </Button>
            </div>
          ) : (
            ""
          )}
        </Container>
      )}
    </>
  );
};

export default ImgGame;
