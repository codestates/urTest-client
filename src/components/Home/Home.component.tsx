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
import { Container, Button, Row, Col } from "react-bootstrap";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { searchState } from "../../common/graphql/client";
import Loading from "../Loading/Loading";
import ImgList from "../ImgList/ImgList.component";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import TextList from "../TextList/TextList.component";
import Fade from "react-reveal/Fade";
import TinderCard from "react-tinder-card";
import { Fade as Afade } from "react-awesome-reveal";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

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
  const [viewAll, setViewAll] = useState(false);
  const [contents, setContents] = useState([] as any);
  const [btnState, setBtnState] = useState("all" as string);
  // tinder ---------
  const alreadyRemoved = [] as any[];
  let charactersState = contents;
  const [characters, setCharacters] = useState([] as any);
  const [lastDirection, setLastDirection] = useState();
  useReactiveVar(searchState);

  const {} = useQuery(GET_CONTENT_ALL, {
    onCompleted: (data) => {
      if (data) {
        setContents([...data.getContentAll]);
        setCharacters([...data.getContentAll]);
        return;
      }
      return;
    },
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
  const btnAll = (e: any) => {
    e.preventDefault();
    setBtnState("all");
  };
  const btnImg = (e: any) => {
    e.preventDefault();
    setBtnState("img");
  };
  const btnText = (e: any) => {
    e.preventDefault();
    setBtnState("text");
  };

  const childRefs = useMemo(
    () =>
      Array(contents.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const swiped = (direction: any, nameToDelete: any) => {
    console.log("removing: " + nameToDelete, lastDirection);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name: any) => {
    // console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character: any) => character.name !== name
    );
    // setCharacters(charactersState);
  };
  const tinderViewAllBtnHandler = (e: any) => {
    console.log(e);
  };
  return (
    <>
      {filterdItem.length === 0 ? (
        <Loading />
      ) : (
        <>
          {!viewAll ? (
            <>
              <Container fluid className="p-0 m-0 tinder-wrapper">
                <div className="tinder-root">
                  <div className="tinder-div1">
                    <div className="tinder-div2">
                      <div className="tinder-card-container">
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
                  </div>
                </div>
                <Row className=" p-0 m-0 justify-content-center">
                  <Afade direction="up" cascade triggerOnce>
                    <Col xl={2}>
                      <AwesomeButton
                        type="link"
                        className="font-jua p-0 btn-tinder-reset"
                      >
                        <Button
                          variant="tinder-urtest"
                          type="button"
                          onClick={(e) => tinderViewAllBtnHandler(e)}
                        >
                          test1
                        </Button>
                      </AwesomeButton>
                    </Col>
                    <Col xl={{ span: 2, offset: 1 }}>
                      <AwesomeButton
                        type="link"
                        className="font-jua p-0 btn-tinder-viewall"
                      >
                        <Button
                          variant="tinder-urtest"
                          // size="lg"
                          // block

                          type="button"
                          onClick={(e) => tinderViewAllBtnHandler(e)}
                        >
                          test1
                        </Button>
                      </AwesomeButton>
                    </Col>
                    <Col xl={{ span: 2, offset: 1 }}>
                      <AwesomeButton
                        type="link"
                        className="font-jua p-0 btn-tinder-imglist"
                      >
                        <Button
                          variant="tinder-urtest"
                          // size="lg"
                          // block

                          type="button"
                          onClick={(e) => tinderViewAllBtnHandler(e)}
                        >
                          test1
                        </Button>
                      </AwesomeButton>
                    </Col>
                    <Col xl={{ span: 2, offset: 1 }}>
                      <AwesomeButton
                        type="link"
                        className="font-jua p-0 btn-tinder-textlist"
                      >
                        <Button
                          variant="tinder-urtest"
                          // size="lg"
                          // block

                          type="button"
                          onClick={(e) => tinderViewAllBtnHandler(e)}
                        >
                          test1
                        </Button>
                      </AwesomeButton>
                    </Col>
                  </Afade>
                </Row>
              </Container>
            </>
          ) : contents.item === 0 ? (
            <Loading />
          ) : (
            <>
              <Container fluid className="card-container">
                <div className="swiper-main-title">
                  <button
                    className={btnState === "all" ? "border-bt" : ""}
                    onClick={btnAll}
                  >
                    전체
                  </button>
                  <button
                    className={btnState === "img" ? "border-bt" : ""}
                    onClick={btnImg}
                  >
                    이상형 게임
                  </button>
                  <button
                    className={btnState === "text" ? "border-bt" : ""}
                    onClick={btnText}
                  >
                    밸런스 게임
                  </button>
                </div>
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
                  <ImgList />
                ) : (
                  <TextList />
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
