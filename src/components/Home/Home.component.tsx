import React, { useState } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../CardList/CardItem.component";
import { Container } from "react-bootstrap";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { searchState } from "../../common/graphql/client";
import Loading from "../Loading/Loading";

// import { gql } from "@apollo/client";

// const GET_CONTENTS = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       ok
//       error
//       token
//     }
//   }
// `;
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Home = () => {
  const GET_CONTENT_ALL = gql`
    query getContentAll {
      getContentAll {
        id
        title
        desc
        type
      }
    }
  `;
  const [contents, setContents] = useState([] as any);

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

  return (
    <>
      <Container fluid className="vh-93 pt-5">
        {contents.length === 0 ? (
          <Loading />
        ) : (
          <Swiper
            className="swiper-container mh-100 min-vh-83"
            // spaceBetween={10}
            // slidesPerView={6}
            // slidesPerColumn={2}
            // slidesPerColumnFill={"row"}
            breakpoints={{
              0: {
                slidesPerView: 1,
                slidesPerColumn: 2,
                slidesPerColumnFill: "row",
              },
              576: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                slidesPerColumnFill: "row",
              },
              768: {
                slidesPerView: 3,
                slidesPerColumn: 2,
                slidesPerColumnFill: "row",
              },
              992: {
                slidesPerView: 4,
                slidesPerColumn: 2,
                slidesPerColumnFill: "row",
              },
              1200: {
                slidesPerView: 5,
                slidesPerColumn: 2,
                slidesPerColumnFill: "row",
              },
              1500: {
                slidesPerView: 6,
                slidesPerColumn: 2,
                slidesPerColumnFill: "row",
              },
            }}
            navigation
            // pagination={{
            //   clickable: true,
            //   type: "fraction",
            // }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {contents.map((el: any) => {
              return (
                <SwiperSlide key={el.id}>
                  <CardItem d={el} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Container>
    </>
  );
};

export default Home;
