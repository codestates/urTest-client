import React from "react";
import CardSlider from "./CardSlider.component";
// import {
//   Form,
//   Button,
//   FormControl,
//   Nav,
//   Navbar,
//   Container,
//   Card,
// } from "react-bootstrap";
// import apple from "../../img/apple.jpg";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container fluid className="vh-93">
        <CardSlider></CardSlider>
      </Container>
    </>
  );
};

export default Home;
