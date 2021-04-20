import React, { useState } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper";
import jwt from "jsonwebtoken";
import { SwiperSlide } from "swiper/react";
import TextCardItem from "../CardList/TextCardItem.component";
import ImgCardItem from "../CardList/ImgCardItem.component";
import { Container, Button, Row, Col } from "react-bootstrap";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { searchState } from "../../common/graphql/client";
import Loading from "../Loading/Loading";
import ImgList from "../ImgList/ImgList.component";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import TextList from "../TextList/TextList.component";
import Fade from "react-reveal/Fade";
// import { Fade as Afade } from "react-awesome-reveal";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const MyTest = () => {
  const GET_CONTENT_ALL = gql`
    query getContentAll {
      getContentAll {
        id
        userId
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
              <Container fluid className="card-container mt-4">
                <Row className="py-0 mb-3 justify-content-center tinder-title">
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
                          if (el.userId === userId) {
                            return (
                              <SwiperSlide
                                className="slide-width mb-2"
                                key={index}
                              >
                                <Fade bottom>
                                  {el.photos.length === 0 ? (
                                    <TextCardItem
                                      d={el}
                                      className="card-item"
                                    />
                                  ) : (
                                    <ImgCardItem d={el} className="card-item" />
                                  )}
                                </Fade>
                              </SwiperSlide>
                            );
                          }
                        })}
                      </div>
                    </Container>
                  </>
                ) : btnState === "img" ? (
                  <ImgList
                    bookMarkLoading={true}
                    userId={() => {
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
                      return userId;
                    }}
                  />
                ) : (
                  <TextList
                    bookMarkLoading={true}
                    userId={() => {
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
                      return userId;
                    }}
                  />
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
