import { Container } from "react-bootstrap";
import { searchState, typeCheck } from "../../common/graphql/client";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { SwiperSlide } from "swiper/react";
import Fade from "react-reveal/Fade";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import Loading from "../Loading/Loading";
import TextCardItem from "../CardList/TextCardItem.component";
import ImgCardItem from "../CardList/ImgCardItem.component";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SearchList = () => {
  const GET_SEARCH_CONTENT = gql`
    query searchContent($keyword: String!, $type: String) {
      searchContent(keyword: $keyword, type: $type) {
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
  const [searchData, setSearchData] = useState(true as any);

  const keyword = useReactiveVar(searchState);
  const type = useReactiveVar(typeCheck);
  const { refetch } = useQuery(GET_SEARCH_CONTENT, {
    fetchPolicy: "no-cache",
    variables: {
      keyword,
      type,
    },
    onCompleted: (data) => {
      if (!data || data.searchContent.length === 0) {
        setSearchData(false);
        return;
      }
      setSearchData(true);
      setContents([...data.searchContent]);
      return;
    },
  });

  useEffect(() => {
    refetch();
    setContents([]);
  }, [location.pathname]);

  return (
    <Container fluid className="vh-93 pt-5 scroll-setting-search">
      {!searchData ? (
        <div>검색결과가 없습니다</div>
      ) : contents.length === 0 ? (
        <Loading />
      ) : (
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
      )}
    </Container>
  );
};

export default SearchList;
