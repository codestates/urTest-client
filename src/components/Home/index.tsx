import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container className="md-6 p-3">
        <Jumbotron>
          <h1 className="header">
            Welcome To React-Bootstrap TypeScript Example
          </h1>
        </Jumbotron>
        {/* <h2>Buttons</h2>
        <ButtonsShowcase /> */}
        {/* <h2>Toasts</h2>
        <ToastsShowcase /> */}
      </Container>
    </>
  );
};

export default Home;
