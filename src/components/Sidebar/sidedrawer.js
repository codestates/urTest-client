/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from "react";
import classNames from "classnames";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class SideDrawer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          id="sidebar"
          className={classNames({ active: this.props.isSideDrawerOpen })}
        >
          <Navbar
            bg="light"
            expand={false}
            variant="light"
            className="sideDrawer"
          >
            <Nav className="">
              <Navbar.Toggle
                className="sm mt-2 ml-3"
                onClick={(ev) => this.props.closeSideDrawer(ev)}
              />
            </Nav>
            <LinkContainer to="/" className="mr-auto ml-1 mt-1">
              <Navbar.Brand>Urtest</Navbar.Brand>
            </LinkContainer>
            {/* <LinkContainer to="/" exact className="mr-auto">
              <Nav.Link>Urtest</Nav.Link>
            </LinkContainer> */}
          </Navbar>
          <Navbar
            bg="light"
            expand={false}
            variant="light"
            className="justify-content-start align-content-start d-flex flex-column"
          >
            {this.props.children}
          </Navbar>
        </div>
        <div
          onClick={(ev) => this.props.closeSideDrawer(ev)}
          className={classNames("overlay", {
            active: this.props.isSideDrawerOpen,
          })}
        />
      </React.Fragment>
    );
  }
}
