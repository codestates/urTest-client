import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { isLoginVar, searchState } from "../../common/graphql/client";
import { useReactiveVar } from "@apollo/client";
import { Search } from "react-bootstrap-icons";
import queryString from "query-string";
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
import { useHistory, useLocation } from "react-router";

const Header = () => {
  const isLogin = useReactiveVar(isLoginVar);
  if (localStorage.getItem("token")) {
    isLoginVar(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    isLoginVar(false);
  };

  const [searchInput, setSearchInput] = useState("" as string);
  useReactiveVar(searchState);
  const searchInputHandler = (e: any) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const location = useLocation();
  const searchBtnHandler = () => {
    if (!searchInput) {
      return;
    }
    searchState(searchInput);
    setSearchInput("");
  };

  const history = useHistory();
  const onKeyPress = (e: any) => {
    if (e.key === "Enter" && searchInput !== "") {
      searchBtnHandler();
      history.push(`/searchlist/${searchInput}`);
    }
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
                <Nav.Link>밸런스게임</Nav.Link>
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
                    <LinkContainer to="/mypage">
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
            <FormControl
              value={searchInput}
              required
              placeholder="검색어를 입력해주세요"
              aria-describedby="basic-addon1"
              onChange={searchInputHandler}
              onKeyPress={onKeyPress}
            />
            <LinkContainer
              to={
                searchInput ? `/searchlist/${searchInput}` : location.pathname
              }
            >
              <InputGroup.Append>
                <Button variant="outline-dark" onClick={searchBtnHandler}>
                  <Search />
                </Button>
              </InputGroup.Append>
            </LinkContainer>
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
