import React, { useState } from "react";
import { Container, Card, CardDeck, Button } from "react-bootstrap";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import {
  ShareFill,
  Heart,
  HeartFill,
  Trophy,
  Pen,
  Trash,
} from "react-bootstrap-icons";
import jwt from "jsonwebtoken";
import SweetAlert from "react-bootstrap-sweetalert";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

const ImgGame = (props: any) => {
  // 전역 변수
  const location = useLocation();
  const isLogin = useReactiveVar(isLoginVar);
  const history = useHistory();

  // 쿼리
  const GET_CONTENTS = gql`
    query getContent($id: Int!) {
      getContent(id: $id) {
        userId
        bookMarks {
          id
          userId
          contentId
        }
        title
        desc
        photos {
          id
          photoUrl
          photoName
          winCount
        }
      }
    }
  `;

  const GET_PROFILE = gql`
    query getProfile($id: Int!) {
      getProfile(id: $id) {
        grade
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

  const POST_DELETECONTENT = gql`
    mutation deleteContent($id: Int!) {
      deleteContent(id: $id) {
        ok
        error
      }
    }
  `;

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
  const [addCountPhoto] = useMutation(POST_WINCOUNT);
  const [deleteContent] = useMutation(POST_DELETECONTENT);

  const [Data, setData] = useState([] as any);
  const [count, setCount] = useState(4);
  const [start, setStart] = useState(true);
  const [img, setImg] = useState([] as any[]);
  const [displays, setDisplays] = useState([] as any[]);
  const [winners, setWinners] = useState([] as any[]);
  const [rounds, setRounds] = useState(0 as any);
  const [transition, setTransiton] = useState(false);
  const [doubleClick, setDoubleClick] = useState(true);
  const [bookMark, setBookMark] = useState(Boolean);
  const [userBookMark, setUserBookMark] = useState([] as any);
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const [sweetAlertLike, setSweetAlertLike] = useState(false);
  const [sweetAlertDelete, setSweetAlertDelete] = useState(false);
  const [modify, setModify] = useState(false);

  const startHandler = () => {
    setStart(false);
    const item = [...Data.photos];
    const itemSort = item.sort(() => Math.random() - 0.5);
    const itemSlice = itemSort.slice(0, count);
    setImg(itemSlice);
    setDisplays([itemSlice[0], itemSlice[1]]);
    setRounds(itemSlice.length / 2);
  };

  const fourCountHandler = () => {
    setCount(4);
  };
  const eightCountHandler = () => {
    setCount(8);
  };
  const oneTwoCountHandler = () => {
    setCount(16);
  };
  const threeTwoCountHandler = () => {
    setCount(32);
  };
  const sixFourCountHandler = () => {
    setCount(64);
  };

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
  const {} = useQuery(GET_PROFILE, {
    variables: {
      id: userId,
    },
    onCompleted: (data) => {
      if (isLogin) {
        if (data.getProfile.grade === "admin") {
          setModify(true);
        }
      }
    },
    fetchPolicy: "cache-and-network",
  });

  const { refetch } = useQuery(GET_CONTENTS, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: (data) => {
      setData(data.getContent);
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
        if (data.getContent.userId === userId) {
          setModify(true);
        }
      }
    },
    fetchPolicy: "cache-and-network",
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

  const notLoginHandler = () => {
    setSweetAlertLike(true);
  };

  const deleteContentBtnHandler = () => {
    setSweetAlertDelete(true);
  };

  return (
    <>
      <SweetAlert
        show={sweetAlertDelete}
        custom
        showCancel
        showCloseButton
        confirmBtnText="삭제"
        cancelBtnText="취소"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="light"
        success
        title="삭제하시겠습니까?"
        onConfirm={() => {
          deleteContent({
            variables: {
              id: +props.gameid,
            },
          });
          setSweetAlertDelete(false);
          history.push("/");
          return;
        }}
        onCancel={() => {
          setSweetAlertDelete(false);
          return;
        }}
      ></SweetAlert>
      <SweetAlert
        show={sweetAlertLike}
        custom
        showCancel
        showCloseButton
        confirmBtnText="로그인"
        cancelBtnText="취소"
        confirmBtnBsStyle="secondary"
        cancelBtnBsStyle="light"
        success
        title="로그인이 필요한 기능입니다."
        onConfirm={() => {
          history.push("/login");
          setSweetAlertLike(false);
          return;
        }}
        onCancel={() => {
          setSweetAlertLike(false);
          return;
        }}
      ></SweetAlert>
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
      {start ? (
        <Container fluid className="mt-3">
          <CardDeck className="vh-92">
            <Card className=" bg-image-imggame border-card" />
            <Card className="border-card">
              <Card.Body>
                <Card.Text>
                  {isLogin ? (
                    bookMark ? (
                      <AwesomeButton type="secondary" className="m-1">
                        <Button
                          variant="urtest"
                          onClick={() => deleteBookMarkBtnHandler()}
                        >
                          <HeartFill />
                        </Button>
                      </AwesomeButton>
                    ) : (
                      <AwesomeButton type="secondary" className="m-1">
                        <Button
                          variant="urtest"
                          onClick={() => bookMarkBtnHandler()}
                        >
                          <Heart />
                        </Button>
                      </AwesomeButton>
                    )
                  ) : (
                    <AwesomeButton type="secondary" className="m-1">
                      <Button
                        variant="urtest"
                        onClick={() => notLoginHandler()}
                      >
                        <Heart />
                      </Button>
                    </AwesomeButton>
                  )}
                  <LinkContainer to={`/analytics/${+props.gameid}/`}>
                    <AwesomeButton type="secondary" className="m-1">
                      <Button variant="urtest">
                        <Trophy />
                      </Button>
                    </AwesomeButton>
                  </LinkContainer>
                  <AwesomeButton type="secondary" className="m-1">
                    <CopyToClipboard
                      text={`https://urtest.shop${location.pathname}`}
                      onCopy={() => copyHandler()}
                    >
                      <Button variant="urtest">
                        <ShareFill />
                      </Button>
                    </CopyToClipboard>
                  </AwesomeButton>
                  {modify ? (
                    <>
                      <LinkContainer to={`/modifytest/${+props.gameid}/`}>
                        <AwesomeButton type="secondary" className="m-1">
                          <Button variant="urtest">
                            <Pen />
                          </Button>
                        </AwesomeButton>
                      </LinkContainer>
                      <AwesomeButton type="secondary" className="m-1">
                        <Button
                          variant="urtest"
                          onClick={() => deleteContentBtnHandler()}
                        >
                          <Trash />
                        </Button>
                      </AwesomeButton>
                    </>
                  ) : (
                    ""
                  )}
                </Card.Text>
                <Card.Text className="card-start-title">{Data.title}</Card.Text>
                <Card.Text className="card-start-title h-10">
                  {count}강
                </Card.Text>
                <Card.Text className="card-start-desc h-40">
                  {Data.desc}
                </Card.Text>
                <Card.Text className="card-text-font m-4">
                  {Data.length !== 0 && Data.photos.length >= 4 ? (
                    <AwesomeButton type="secondary" className="m-1">
                      <Button
                        variant="urtest"
                        onClick={() => fourCountHandler()}
                      >
                        4강
                      </Button>
                    </AwesomeButton>
                  ) : (
                    ""
                  )}
                  {Data.length !== 0 && Data.photos.length >= 8 ? (
                    <AwesomeButton type="secondary" className="m-1">
                      <Button
                        variant="urtest"
                        onClick={() => eightCountHandler()}
                      >
                        8강
                      </Button>
                    </AwesomeButton>
                  ) : (
                    ""
                  )}
                  {Data.length !== 0 && Data.photos.length >= 16 ? (
                    <AwesomeButton type="secondary" className="m-1">
                      <Button
                        variant="urtest"
                        onClick={() => oneTwoCountHandler()}
                      >
                        16강
                      </Button>
                    </AwesomeButton>
                  ) : (
                    ""
                  )}
                  {Data.length !== 0 && Data.photos.length >= 32 ? (
                    <AwesomeButton type="secondary" className="m-1">
                      <Button
                        variant="urtest"
                        onClick={() => threeTwoCountHandler()}
                      >
                        32강
                      </Button>
                    </AwesomeButton>
                  ) : (
                    ""
                  )}
                  {Data.length !== 0 && Data.photos.length >= 64 ? (
                    <AwesomeButton type="secondary">
                      <Button
                        variant="urtest"
                        onClick={() => sixFourCountHandler()}
                      >
                        64강
                      </Button>
                    </AwesomeButton>
                  ) : (
                    ""
                  )}
                </Card.Text>
                <Card.Text className="card-text-font">
                  <AwesomeButton type="primary">
                    <Button variant="urtest" onClick={() => startHandler()}>
                      시작하기
                    </Button>
                  </AwesomeButton>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
        </Container>
      ) : (
        <Container className="mt-5" style={{ textAlign: "center" }}>
          <h1 className="header-text title-reposition">
            {Data.title}{" "}
            {rounds === "우승" ? (
              "우승"
            ) : rounds === 1 ? (
              `결승`
            ) : (
              <>
                {`${rounds * 2}강`}
                <br />
                {`${winners.length + 1} / ${rounds}`}
              </>
            )}
          </h1>
          {rounds === "우승" ? (
            <div className="mt-4">
              <LinkContainer to={`/imggame/${+props.gameid}/`}>
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
          ) : (
            ""
          )}
          <CardDeck
            className={
              displays.length === 1 ? "card-deck-transition mt-3" : "mt-3"
            }
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
                  style={{ borderColor: "#ffff" }}
                >
                  <Card.Body className="card-size">
                    <Card.Text className="card-text-font">
                      {d.photoName}{" "}
                      {displays.length === 1
                        ? `우승 횟수 : ${d.winCount}승`
                        : ""}
                    </Card.Text>
                    <Card.Img
                      src={d.photoUrl}
                      alt=""
                      className={
                        transition ? "card-img-transition" : "card-img"
                      }
                      style={{ borderRadius: "1.5rem" }}
                    />
                  </Card.Body>
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
