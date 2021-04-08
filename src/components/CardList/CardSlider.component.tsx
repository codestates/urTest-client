import React from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Row, Col, Container } from "react-bootstrap";
import CardItem from "./CardItem.component";
import { LinkContainer } from "react-router-bootstrap";
const items = [
  {
    name: "apple",
    src: "apple",
  },
  {
    name: "berries",
    src: "berries",
  },
  {
    name: "ice cream",
    src: "ice_cream",
  },
  {
    name: "cherry",
    src: "cherry",
  },
  {
    name: "ddalgi",
    src: "ddalgi",
  },
  {
    name: "gul",
    src: "gul",
  },
  {
    name: "kiwi",
    src: "kiwi",
  },
  {
    name: "apple",
    src: "apple",
  },
  {
    name: "berries",
    src: "berries",
  },
  {
    name: "ice cream",
    src: "ice_cream",
  },
  {
    name: "cherry",
    src: "cherry",
  },
  {
    name: "ddalgi",
    src: "ddalgi",
  },
  {
    name: "gul",
    src: "gul",
  },
  {
    name: "kiwi",
    src: "kiwi",
  },
  {
    name: "apple",
    src: "apple",
  },
  {
    name: "berries",
    src: "berries",
  },
  {
    name: "ice cream",
    src: "ice_cream",
  },
  {
    name: "cherry",
    src: "cherry",
  },
  {
    name: "ddalgi",
    src: "ddalgi",
  },
  {
    name: "gul",
    src: "gul",
  },
  {
    name: "kiwi",
    src: "kiwi",
  },
  {
    name: "apple",
    src: "apple",
  },
  {
    name: "berries",
    src: "berries",
  },
  {
    name: "ice cream",
    src: "ice_cream",
  },
  {
    name: "cherry",
    src: "cherry",
  },
  {
    name: "ddalgi",
    src: "ddalgi",
  },
  {
    name: "gul",
    src: "gul",
  },
  {
    name: "kiwi",
    src: "kiwi",
  },
  {
    name: "apple",
    src: "apple",
  },
  {
    name: "berries",
    src: "berries",
  },
  {
    name: "ice cream",
    src: "ice_cream",
  },
  {
    name: "cherry",
    src: "cherry",
  },
  {
    name: "ddalgi",
    src: "ddalgi",
  },
  {
    name: "gul",
    src: "gul",
  },
  {
    name: "kiwi",
    src: "kiwi",
  },
];

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const CardSlider = () => {
  return (
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
      {items.map((el, i) => {
        return (
          <SwiperSlide key={i}>
            <CardItem d={el} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardSlider;
