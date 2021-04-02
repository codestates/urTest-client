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
} from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Col className="mr-auto" sm={4}>
        <Navbar.Toggle className="mr-2 sm" aria-controls="basic-navbar-nav" />
        <LinkContainer to="/">
          <Navbar.Brand>Urtest</Navbar.Brand>
        </LinkContainer>
      </Col>
      <Navbar.Collapse id="basic-navbar-nav" className="mr-auto">
        <Nav className="mr-auto">
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
          <LinkContainer to="/login">
            <Button variant="outline-dark">Login</Button>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      <Col sm={4} className="mt-1 ml-auto">
        <InputGroup size="sm">
          <FormControl aria-describedby="basic-addon1" />
          <InputGroup.Append>
            <Button variant="outline-dark">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </>
  );
};

export default Header;
