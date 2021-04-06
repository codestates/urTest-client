import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { isLoginVar } from "../../common/graphql/client";
import { useReactiveVar } from "@apollo/client";
import { Search, Trophy, Pen } from "react-bootstrap-icons";

import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  InputGroup,
  FormControl,
  Col,
  Container,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

const renderTooltip1 = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    이상형월드컵
  </Tooltip>
);
const renderTooltip2 = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    밸런스게임
  </Tooltip>
);

const Header = () => {
  const isLogin = useReactiveVar(isLoginVar);
  if (localStorage.getItem("token")) {
    isLoginVar(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    isLoginVar(false);
  };

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
              <LinkContainer to="/textlist">
                <Nav.Link>심리테스트</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/imglist">
                <Nav.Link>이상형월드컵</Nav.Link>
              </LinkContainer>
              {isLogin ? (
                <>
                  <NavDropdown title="마이페이지" id="basic-nav-dropdown">
                    <LinkContainer to="/">
                      <Nav.Link>나의 테스트</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                      <Nav.Link>정보수정</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                      <Nav.Link>즐겨찾기</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <LinkContainer to="/multistep">
                    <Nav.Link>테스트 만들기</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Col>
        <Col xl={4} lg={4} md={5} sm={5} xs={6} className="mt-1 mr-auto">
          <InputGroup size="sm">
            <InputGroup.Prepend>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 50, hide: 400 }}
                overlay={renderTooltip1}
              >
                <Button variant="outline-secondary" active>
                  <Trophy />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 50, hide: 400 }}
                overlay={renderTooltip2}
              >
                <Button variant="outline-secondary">
                  <Pen />
                </Button>
              </OverlayTrigger>
            </InputGroup.Prepend>
            <FormControl aria-describedby="basic-addon1" />
            <InputGroup.Append>
              <Button variant="outline-dark">
                <Search />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        {isLogin ? (
          <LinkContainer to="/" className="d-none d-md-block ml-auto">
            <Button variant="outline-dark" onClick={() => logoutHandler()}>
              Logout
            </Button>
          </LinkContainer>
        ) : (
          <LinkContainer to="/login" className="d-none d-md-block ml-auto">
            <Button variant="outline-dark">Login</Button>
          </LinkContainer>
        )}
      </Container>
    </>
  );
};

export default Header;
