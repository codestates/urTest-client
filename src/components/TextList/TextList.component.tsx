import React, { useState } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import TextCardItem from "../CardList/TextCardItem.component";
import { Container } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import Loading from "../Loading/Loading";
import Fade from "react-reveal/Fade";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const TextList = () => {
  const GET_CONTENT_ALL = gql`
    query getContentAll($type: String) {
      getContentAll(type: $type) {
        id
        title
        desc
        type
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

  const {} = useQuery(GET_CONTENT_ALL, {
    variables: {
      type: "textgame",
    },
    onCompleted: (data) => {
      setContents([...data.getContentAll]);
    },
  });

  return (
    <>
      <Container fluid className="fluid-item">
        {contents.length === 0 ? (
          <Loading />
        ) : (
          <>
            <div className="gridbox">
              {contents.map((el: any, index: number) => {
                return (
                  <div className="card-item" key={index}>
                    <Fade bottom>
                      <TextCardItem d={el} key={index} className="card-item" />
                    </Fade>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default TextList;
