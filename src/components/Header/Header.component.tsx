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
              <LinkContainer to="/" exact>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/all-tours">
                <Nav.Link>Tours</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Others" id="basic-nav-dropdown">
                <LinkContainer to="/xyz">
                  <NavDropdown.Item>404</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/tour-detail/100">
                  <NavDropdown.Item>Tour Detail</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
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
