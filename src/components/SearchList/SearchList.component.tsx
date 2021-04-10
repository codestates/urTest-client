import { useReactiveVar } from "@apollo/client";
import { Container } from "react-bootstrap";
import { searchState } from "../../common/graphql/client";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../CardList/CardItem.component";
import { gql, useQuery } from "@apollo/client";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SearchList = () => {
  const GET_SEARCH_CONTENT = gql`
    query searchContent($keyword: String!) {
      searchContent(keyword: $keyword) {
        id
        title
        desc
        type
      }
    }
  `;
  const [contents, setContents] = useState([] as any);

  const keyword = useReactiveVar(searchState);

  const { loading } = useQuery(GET_SEARCH_CONTENT, {
    variables: {
      keyword,
    },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setContents([...data.searchContent]);
    },
  });

  useEffect(() => {
    console.log(contents);
    searchState("");
  }, []);
  return (
    <>
      <Container fluid className="vh-93 pt-5">
        {loading ? (
          <div>Loading...</div>
        ) : contents.length === 0 ? (
          <div>검색결과가 없습니다</div>
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

export default SearchList;
