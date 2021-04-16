import React, { useState } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ImgCardItem from "../CardList/ImgCardItem.component";
import { Container } from "react-bootstrap";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { searchState } from "../../common/graphql/client";
import Loading from "../Loading/Loading";
import ImgList from "../ImgList/ImgList.component";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import TextList from "../TextList/TextList.component";
import TextCardItem from "../CardList/TextCardItem.component";
import Fade from "react-reveal/Fade";

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
      }
    }
  `;
  const [contents, setContents] = useState([] as any);
  const [btnState, setBtnState] = useState("all" as string);

  useReactiveVar(searchState);

  const {} = useQuery(GET_CONTENT_ALL, {
    onCompleted: (data) => {
      if (data) {
        setContents([...data.getContentAll]);
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

  return (
    <>
      <Container fluid className="card-container">
        {filterdItem.length === 0 ? (
          <Loading />
        ) : (
          <>
            <div className="sw-header">
              <div className="swiper-title">
                <h3>인기 순</h3>
              </div>

              <Swiper
                className="swiper-container item-container pb-3 mh-100"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "row",
                  },
                  576: {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "row",
                  },
                  768: {
                    slidesPerView: 2,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "row",
                  },
                  992: {
                    slidesPerView: 3,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "row",
                  },
                  1200: {
                    slidesPerView: 3,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "row",
                  },
                  1500: {
                    slidesPerView: 4,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "row",
                  },
                }}
                navigation
              >
                {filterdItem.slice(0, 8).map((el: any, index: number) => {
                  return (
                    <SwiperSlide className="slide-width" key={index}>
                      {el.photos.length === 0 ? (
                        <TextCardItem d={el} className="card-item" />
                      ) : (
                        <ImgCardItem d={el} className="card-item" />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {contents.item === 0 ? (
              <Loading />
            ) : (
              <>
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
                            <div className="card-item" key={index}>
                              <Fade bottom>
                                {el.photos.length === 0 ? (
                                  <TextCardItem d={el} className="card-item" />
                                ) : (
                                  <ImgCardItem d={el} className="card-item" />
                                )}
                              </Fade>
                            </div>
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
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
