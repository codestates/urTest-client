import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar.Toggle className="mr-2" aria-controls="basic-navbar-nav" />
      <LinkContainer to="/">
        <Navbar.Brand>Urtest</Navbar.Brand>
      </LinkContainer>
      <Navbar.Collapse id="basic-navbar-nav">
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
        </Nav>
      </Navbar.Collapse>
      <Nav className="ml-auto">
        <LinkContainer to="/login">
          <Button variant="outline-dark">Login</Button>
        </LinkContainer>
      </Nav>
    </>
  );
};

export default Header;
