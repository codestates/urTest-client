import React, { useState, useMemo } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper";
import { SwiperSlide } from "swiper/react";
import TextCardItem from "../CardList/TextCardItem.component";
import ImgCardItem from "../CardList/ImgCardItem.component";
import TinderImgCardItem from "../CardList/TinderImgCard.component";
import TinderTextCardItem from "../CardList/TinderTextCard.component";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { searchState, openingVar } from "../../common/graphql/client";
import Loading from "../Loading/Loading";
import ImgList from "../ImgList/ImgList.component";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import TextList from "../TextList/TextList.component";
import Fade from "react-reveal/Fade";
import TinderCard from "react-tinder-card";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import FollowMe from "../FollowMe/FollowMe.component";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -200px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const rotateUp = keyframes`

  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  99% {
    opacity: 1;
    height: 100%;
    z-index: 100;
  }
  
  to {
    opacity: 0;
    transform: translate3d(0, -96px, 0);  
    height: 0;
    z-index: -1;
  }
  
`;

const Home = () => {
  const GET_CONTENT_ALL = gql`
    query getContentAll {
      getContentAll {
        id
        title
        desc
        type
        views
        photos {
          photoUrl
        }
        question {
          questionBody
          answer {
            body
          }
        }
      }
    }
  `;
  const [viewAll, setViewAll] = useState(openingVar);
  const [tinderBtnAni, setTinderBtnAni] = useState(false);
  const [contents, setContents] = useState([] as any);
  const [btnState, setBtnState] = useState("all" as string);
  // tinder ---------
  const alreadyRemoved = [] as any[];
  let charactersState = contents;
  const [characters, setCharacters] = useState([] as any);
  useReactiveVar(searchState);
  useReactiveVar(openingVar);

  const {} = useQuery(GET_CONTENT_ALL, {
    onCompleted: (data) => {
      if (data) {
        setContents([...data.getContentAll]);
        setCharacters(
          [...data.getContentAll].sort((a: any, b: any) => {
            return a.views - b.views;
          })
        );
        return;
      }
      return;
    },
    fetchPolicy: "cache-and-network",
  });

  const views = contents
    .map((item: any) => {
      return item.views;
    })
    .sort((a: number, b: number) => b - a);

  const filterdItem = [] as any;
  views.map((item: any) => {
    contents.map((el: any) => {
      if (item === el.views) {
        filterdItem.push(el);
        return el;
      }
    });
  });

  const childRefs = useMemo(
    () =>
      Array(contents.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const swiped = (direction: any, nameToDelete: any) => {
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name: any) => {
    charactersState = charactersState.filter(
      (character: any) => character.name !== name
    );
  };
  const tinderBtnHandler = async (e: any) => {
    e.preventDefault();
    if (
      e.target.closest(".tinder-title").querySelectorAll(".aws-btn__content")
        .length
    ) {
      e.target
        .closest(".tinder-title")
        .querySelectorAll(".aws-btn__content")
        .forEach((button: any) => {
          button.classList.remove("active");
        });
    }
    if (e.target.textContent === "Swipe") {
      setBtnState("all");
      openingVar(false);
      !tinderBtnAni ? setTinderBtnAni(true) : setTinderBtnAni(false);
      if (!viewAll) {
        await delay(1000);
        setViewAll(true);
      } else {
        setViewAll(false);
      }
    } else {
      openingVar(false);
      window.location.reload();
    }
  };
  const tinderViewAllBtnHandler = async (e: any) => {
    e.preventDefault();
    if (
      e.target.closest(".tinder-title").querySelectorAll(".aws-btn__content")
        .length
    ) {
      e.target
        .closest(".tinder-title")
        .querySelectorAll(".aws-btn__content")
        .forEach((button: any) => {
          button.classList.remove("active");
        });
    }
    if (e.target.closest(".aws-btn__content")) {
      e.target.closest(".aws-btn__content").classList.add("active");
    }
    setBtnState("all");
    openingVar(true);
    if (!tinderBtnAni) {
      setTinderBtnAni(true);
    }
    if (!viewAll) {
      await delay(1000);
      setViewAll(true);
      document
        .querySelector(".btn-home-viewall button")
        ?.closest(".aws-btn__content")
        ?.classList.add("active");
    }
  };
  const tinderImglistBtnHandler = async (e: any) => {
    e.preventDefault();
    if (
      e.target.closest(".tinder-title").querySelectorAll(".aws-btn__content")
        .length
    ) {
      e.target
        .closest(".tinder-title")
        .querySelectorAll(".aws-btn__content")
        .forEach((button: any) => {
          button.classList.remove("active");
        });
    }
    if (e.target.closest(".aws-btn__content")) {
      e.target.closest(".aws-btn__content").classList.add("active");
    }
    setBtnState("img");
    openingVar(true);
    if (!tinderBtnAni) {
      setTinderBtnAni(true);
    }
    if (!viewAll) {
      await delay(1000);
      setViewAll(true);
      document
        .querySelector(".btn-home-imglist button")
        ?.closest(".aws-btn__content")
        ?.classList.add("active");
    }
  };
  const tinderTextlistBtnHandler = async (e: any) => {
    e.preventDefault();
    if (
      e.target.closest(".tinder-title").querySelectorAll(".aws-btn__content")
        .length
    ) {
      e.target
        .closest(".tinder-title")
        .querySelectorAll(".aws-btn__content")
        .forEach((button: any) => {
          button.classList.remove("active");
        });
    }
    if (e.target.closest(".aws-btn__content")) {
      e.target.closest(".aws-btn__content").classList.add("active");
    }
    setBtnState("text");
    openingVar(true);
    if (!tinderBtnAni) {
      setTinderBtnAni(true);
    }
    if (!viewAll) {
      await delay(1000);
      setViewAll(true);
      document
        .querySelector(".btn-home-textlist button")
        ?.closest(".aws-btn__content")
        ?.classList.add("active");
    }
  };
  return (
    <>
      {filterdItem.length === 0 ? (
        <Loading />
      ) : (
        <>
          {!viewAll ? (
            <>
              <Container fluid className="p-0 mt-3 mx-0 tinder-wrapper">
                <Row className=" p-0 m-0 justify-content-center tinder-title">
                  {!tinderBtnAni ? (
                    <Reveal keyframes={fadeInUp} triggerOnce cascade>
                      <Col md="auto" className="col-tinder">
                        <AwesomeButton
                          type="link"
                          className="font-jua p-0 btn-tinder-reset"
                        >
                          <Button
                            variant="tinder-urtest"
                            type="button"
                            onClick={(e) => tinderBtnHandler(e)}
                          >
                            {viewAll ? "Swipe" : "Reset"}
                          </Button>
                        </AwesomeButton>
                      </Col>
                      <Col md="auto" className="col-tinder">
                        <AwesomeButton
                          type="link"
                          className="font-jua p-0 btn-tinder-viewall"
                        >
                          <Button
                            variant="tinder-urtest"
                            type="button"
                            onClick={(e) => tinderViewAllBtnHandler(e)}
                          >
                            전체보기
                          </Button>
                        </AwesomeButton>
                      </Col>
                      <Col md="auto" className="col-tinder">
                        <AwesomeButton
                          type="link"
                          className="font-jua p-0 btn-tinder-imglist"
                        >
                          <Button
                            variant="tinder-urtest"
                            type="button"
                            onClick={tinderImglistBtnHandler}
                          >
                            이상형월드컵
                          </Button>
                        </AwesomeButton>
                      </Col>
                      <Col md="auto" className="col-tinder">
                        <AwesomeButton
                          type="link"
                          className={`font-jua p-0 ${
                            btnState === "text" ? "border-bt" : ""
                          } btn-tinder-textlist`}
                        >
                          <Button
                            variant="tinder-urtest"
                            type="button"
                            onClick={tinderTextlistBtnHandler}
                          >
                            밸런스게임
                          </Button>
                        </AwesomeButton>
                      </Col>
                    </Reveal>
                  ) : (
                    <Reveal keyframes={rotateUp} triggerOnce>
                      <Col md="auto" className="col-tinder">
                        <AwesomeButton
                          type="link"
                          className="font-jua p-0 btn-tinder-reset"
                        >
                          <Button
                            variant="tinder-urtest"
                            type="button"
                            onClick={(e) => tinderBtnHandler(e)}
                          >
                            {viewAll ? "Swipe" : "Reset"}
                          </Button>
                        </AwesomeButton>
                      </Col>
                      <Col md="auto" className="col-tinder">
                        <AwesomeButton
                          type="link"
                          className="font-jua p-0 btn-tinder-viewall"
                        >
                          <Button
                            variant="tinder-urtest"
                            type="button"
                            onClick={(e) => tinderViewAllBtnHandler(e)}
                          >
                            전체보기
                          </Button>
                        </AwesomeButton>
                      </Col>
                      <Col md="auto" className="col-tinder">
                        <AwesomeButton
                          type="link"
                          className="font-jua p-0 btn-tinder-imglist"
                        >
                          <Button
                            variant="tinder-urtest"
                            type="button"
                            onClick={tinderImglistBtnHandler}
                          >
                            이상형월드컵
                          </Button>
                        </AwesomeButton>
                      </Col>
                      <Col md="auto" className="col-tinder">
                        <AwesomeButton
                          type="link"
                          className={`font-jua p-0 ${
                            btnState === "text" ? "border-bt" : ""
                          } btn-tinder-textlist`}
                        >
                          <Button
                            variant="tinder-urtest"
                            type="button"
                            onClick={tinderTextlistBtnHandler}
                          >
                            밸런스게임
                          </Button>
                        </AwesomeButton>
                      </Col>
                    </Reveal>
                  )}
                </Row>
                <div className="tinder-root">
                  <div className="tinder-div1">
                    <div className="tinder-div2">
                      <div className="tinder-card-container">
                        <Image
                          src="http://drive.google.com/uc?export=view&id=1uXqJ6LcWhgGm096abl4XUe2RU-amZC4D"
                          className="guesture"
                        />
                        {characters.map((character: any, index: any) => (
                          <>
                            <TinderCard
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              ref={childRefs[index]}
                              className="swipe"
                              key={character.id}
                              onSwipe={(dir) => swiped(dir, character.id)}
                              onCardLeftScreen={() => outOfFrame(character.id)}
                            >
                              {character.photos.length === 0 ? (
                                <TinderTextCardItem
                                  d={character}
                                  className="tinder-card animate__pulse"
                                />
                              ) : (
                                <TinderImgCardItem
                                  d={character}
                                  className="tinder-card"
                                />
                              )}
                            </TinderCard>
                          </>
                        ))}
                      </div>
                    </div>
                    <FollowMe />
                  </div>
                </div>
              </Container>
            </>
          ) : contents.item === 0 ? (
            <Loading />
          ) : (
            <>
              <Container fluid className="card-container">
                <Row className=" py-0  mt-4 mb-3 mx-0 justify-content-center tinder-title">
                  <Col md="auto" className="col-tinder">
                    <AwesomeButton
                      type="link"
                      className="font-jua p-0 btn-home-reset"
                    >
                      <Button
                        variant="tinder-urtest"
                        type="button"
                        onClick={tinderBtnHandler}
                      >
                        {viewAll ? "Swipe" : "Reset"}
                      </Button>
                    </AwesomeButton>
                  </Col>
                  <Col md="auto" className="col-tinder">
                    <AwesomeButton
                      type="link"
                      className="font-jua p-0 btn-home-viewall"
                    >
                      <Button
                        variant="tinder-urtest"
                        type="button"
                        onClick={tinderViewAllBtnHandler}
                      >
                        전체보기
                      </Button>
                    </AwesomeButton>
                  </Col>
                  <Col md="auto" className="col-tinder">
                    <AwesomeButton
                      type="link"
                      className="font-jua p-0 btn-home-imglist"
                    >
                      <Button
                        variant="tinder-urtest"
                        type="button"
                        onClick={tinderImglistBtnHandler}
                      >
                        이상형월드컵
                      </Button>
                    </AwesomeButton>
                  </Col>
                  <Col md="auto" className="col-tinder">
                    <AwesomeButton
                      type="link"
                      className="font-jua p-0 btn-home-textlist"
                    >
                      <Button
                        variant="tinder-urtest"
                        type="button"
                        onClick={tinderTextlistBtnHandler}
                      >
                        밸런스게임
                      </Button>
                    </AwesomeButton>
                  </Col>
                </Row>
                {btnState === "all" ? (
                  <>
                    <Container fluid className="fluid-item">
                      <div className="gridbox">
                        {contents.map((el: any, index: number) => {
                          return (
                            <SwiperSlide className="slide-width" key={index}>
                              <Fade bottom>
                                {el.photos.length === 0 ? (
                                  <TextCardItem d={el} className="card-item" />
                                ) : (
                                  <ImgCardItem d={el} className="card-item" />
                                )}
                              </Fade>
                            </SwiperSlide>
                          );
                        })}
                      </div>
                    </Container>
                  </>
                ) : btnState === "img" ? (
                  <ImgList bookMarkLoading={false} />
                ) : (
                  <TextList bookMarkLoading={false} />
                )}
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
