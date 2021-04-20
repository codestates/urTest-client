import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useParams,
} from "react-router-dom";
import { isLoginVar } from "../common/graphql/client";
import { useReactiveVar } from "@apollo/client";
import SweetAlert from "react-bootstrap-sweetalert";

// Page ---------------------------------------
import Home from "./Home/Home.component";
import Header from "./Header/Header.component";
import ImgGame from "./ImgGame/ImgGame.component";
import TextGame from "./TextGame/TextGame.componet";
import SideDrawer from "./Sidebar/sidedrawer";
import Signin from "./Signin/Signin.component";
import Signup from "./Signup/Signup.component";
import ImgList from "./ImgList/ImgList.component";
import TextList from "./TextList/TextList.component";
import SearchList from "./SearchList/SearchList.component";
import Multistep from "./Upload/Multistep.component";
import Mypage from "./Mypage/Mypage.component";
import Analytics from "./Analytics/Analytics.component";
import ModifyTest from "./ModifyTest/ModifyTest.component";
import MyTest from "./MyTest/MyTest.component";
import Bookmark from "./Bookmark/Bookmark.component";
import ModifyTestT from "./ModifyTest/ModifyTestT.component";
// bootstrap ---------------------------
import { Nav, Navbar, Col, Row, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SideDrawerBrand = () => (
  <LinkContainer to="/">
    <Navbar.Brand />
  </LinkContainer>
);

const NoMatch = () => {
  const location = useLocation();

  return (
    <Container fluid className="vh-93">
      <Row className="h-20 justify-content-center">
        <Col md="auto" className="pt-5 font-size-3 notfound-title">
          <code className="font-bgr">{location.pathname}</code> 페이지가
          존재하지 않습니다.
        </Col>
      </Row>
      <Row className="h-80">
        <Col className="bg-image4"></Col>
      </Row>
    </Container>
  );
};

const ImgGameId = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = useParams();
  return <ImgGame gameid={id} />;
};
const TextGameId = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = useParams();
  return <TextGame gameid={id} />;
};
const AnalyticsGameId = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = useParams();
  return <Analytics gameid={id} />;
};
const ModifyGameId = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = useParams();
  return <ModifyTest gameid={id} />;
};
const ModifyTGameId = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = useParams();
  return <ModifyTestT gameid={id} />;
};

const App = () => {
  const [isSideBarOpen, setSideBarState] = useState(false);
  const [sweetAlertShow, setSweetAlertShow] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const deregisterListener = history.listen(() => {
      setSideBarState(false);
    });
    return () => {
      deregisterListener();
    };
  }, [history]);

  const isLogin = useReactiveVar(isLoginVar);

  const needLogin = () => {
    setSideBarState(false);
    setSweetAlertShow(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uploadObj");
    isLoginVar(false);
  };

  return (
    <>
      <Navbar
        expand={false}
        className="justify-content-start header-nav bg-white"
        fixed="top"
        expanded={false}
        onToggle={(toggleState: boolean) => {
          setSideBarState(true);
        }}
      >
        <Header />
      </Navbar>
      <SideDrawer
        isSideDrawerOpen={isSideBarOpen}
        brand={<SideDrawerBrand />}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        closeSideDrawer={(ev: any) => setSideBarState(false)}
      >
        <Col>
          <Nav>
            <Nav.Item>
              {/* <LinkContainer to="/" exact>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer> */}
            </Nav.Item>
            {/* <Nav.Item>
              <LinkContainer to="/imglist">
                <Nav.Link>이상형월드컵</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/textlist">
                <Nav.Link>밸런스게임</Nav.Link>
              </LinkContainer>
            </Nav.Item> */}
            <Nav.Item>
              {isLogin ? (
                <LinkContainer to="/mytest">
                  <Nav.Link>내가만든 테스트</Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link onClick={needLogin}>내가만든 테스트</Nav.Link>
              )}
            </Nav.Item>
            <Nav.Item>
              {isLogin ? (
                <LinkContainer to="/mypage">
                  <Nav.Link>정보수정</Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link onClick={needLogin}>정보수정</Nav.Link>
              )}
            </Nav.Item>
            {isLogin ? (
              <LinkContainer to="/bookmark">
                <Nav.Link>즐겨찾기</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link onClick={needLogin}>즐겨찾기</Nav.Link>
            )}
            <Nav.Item>
              {isLogin ? (
                <LinkContainer to="/multistep">
                  <Nav.Link>테스트 만들기</Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link onClick={needLogin}>테스트 만들기</Nav.Link>
              )}
            </Nav.Item>
            <Nav.Item>
              {isLogin ? (
                <LinkContainer to="/">
                  <Nav.Link onClick={() => logoutHandler()}>Logout</Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/Login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav.Item>
          </Nav>
        </Col>
      </SideDrawer>
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/imggame/:id/" component={ImgGameId} />
          <Route path="/textgame/:id/" component={TextGameId} />
          <Route path="/analytics/:id/" component={AnalyticsGameId} />
          <Route path="/imglist" component={ImgList} />
          <Route path="/textlist" component={TextList} />
          <Route path="/searchlist" component={SearchList} />
          <Route path="/login" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/multistep" component={Multistep} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/mytest" component={MyTest} />
          <Route path="/bookmark" component={Bookmark} />
          <Route path="/modifytest/:id/" component={ModifyGameId} />
          <Route path="/modifytext/:id/" component={ModifyTGameId} />
          <Route path="/*">
            <NoMatch />
          </Route>
        </Switch>
        <SweetAlert
          show={sweetAlertShow}
          showConfirm={false}
          success
          title="로그인이 필요해요"
          onConfirm={() => {
            history.push("/login");
            setSweetAlertShow(false);
            return;
          }}
          onCancel={() => {
            history.push("/login");
            setSweetAlertShow(false);
            return;
          }}
        >
          기다리고 있을게요!
        </SweetAlert>
      </div>
    </>
  );
};

export default App;
