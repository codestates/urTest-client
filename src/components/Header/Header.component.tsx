import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Nav } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Nav>
        <Nav.Item>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to="/buttons">
            <Nav.Link>buttons</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to="/toasts">
            <Nav.Link>toasts</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Header;
