import React from "react";
import CardSlider from "../CardList/CardSlider.component";
import { Container } from "react-bootstrap";
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
const Home = () => {
  return (
    <>
      <Container fluid className="vh-93 pt-5">
        <CardSlider></CardSlider>
      </Container>
    </>
  );
};

export default Home;
