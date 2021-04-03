import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  InputGroup,
  FormControl,
  Col,
  Container,
} from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Container fluid={true}>
        <Col xl={1} lg={2} md={4} sm={5} xs={6} className="urBrand">
          <Navbar.Toggle className="mr-2 sm" aria-controls="basic-navbar-nav" />
          <LinkContainer to="/">
            <Navbar.Brand>Urtest</Navbar.Brand>
          </LinkContainer>
        </Col>
        <Col xl={4} lg={3} className="d-none d-lg-block">
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className="">
              <LinkContainer to="/simri">
                <Nav.Link>심리테스트</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cup">
                <Nav.Link>이상형월드컵</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Col>
        <Col xl={4} lg={4} md={5} sm={5} xs={6} className="mt-1 mr-auto">
          <InputGroup size="sm">
            <FormControl aria-describedby="basic-addon1" />
            <InputGroup.Append>
              <Button variant="outline-dark">Q</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <LinkContainer to="/login" className="d-none d-md-block ml-auto">
          <Button variant="outline-dark">Login</Button>
        </LinkContainer>
      </Container>
    </>
  );
};

export default Header;
