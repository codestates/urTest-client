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
// import { Fade as Afade } from "react-awesome-reveal";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const MyTest = () => {
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
  const [contents, setContents] = useState([] as any);
  const [btnState, setBtnState] = useState("all" as string);
  // tinder ---------
  useReactiveVar(searchState);

  const {} = useQuery(GET_CONTENT_ALL, {
    onCompleted: (data) => {
      if (data) {
        setContents([...data.getContentAll]);
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
  const ViewAllBtnHandler = (e: any) => {
    e.preventDefault();
    setBtnState("all");
  };
  const ImglistBtnHandler = (e: any) => {
    e.preventDefault();
    setBtnState("img");
  };
  const TextlistBtnHandler = (e: any) => {
    e.preventDefault();
    setBtnState("text");
  };

  return (
    <>
      {filterdItem.length === 0 ? (
        <Loading />
      ) : (
        <>
          {contents.item === 0 ? (
            <Loading />
          ) : (
            <>
              <Container fluid className="card-container">
                <Row className=" py-0 mb-2 justify-content-center tinder-title">
                  <Col md="auto" className="col-tinder">
                    <AwesomeButton
                      type="link"
                      className="font-jua p-0 btn-home-viewall"
                    >
                      <Button
                        variant="tinder-urtest"
                        type="button"
                        onClick={ViewAllBtnHandler}
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
                        onClick={ImglistBtnHandler}
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
                        onClick={TextlistBtnHandler}
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

export default MyTest;
