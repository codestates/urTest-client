import React from "react";
import {
  Form,
  Button,
  FormControl,
  Nav,
  Navbar,
  Container,
  Card,
} from "react-bootstrap";
import apple from "../../img/apple.jpg";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <>
      <Container className="md-5 p-3">
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar>
      </Container>
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={apple} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
            <LinkContainer to="/imggame">
              <Card.Link>ImgGame</Card.Link>
            </LinkContainer>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;
