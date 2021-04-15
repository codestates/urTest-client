import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useParams,
} from "react-router-dom";

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
import ModifyTestT from "./ModifyTest/ModifyTestT.component";
// bootstrap ---------------------------
import { Nav, Navbar, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SideDrawerBrand = () => (
  <LinkContainer to="/">
    <Navbar.Brand />
  </LinkContainer>
);

const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h3 className="no-match">
        <code>{location.pathname}</code> 페이지가 존재하지 않습니다.
      </h3>
    </div>
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
  const history = useHistory();
  useEffect(() => {
    const deregisterListener = history.listen(() => {
      setSideBarState(false);
    });
    return () => {
      deregisterListener();
    };
  }, [history]);

  return (
    <>
      <Navbar
        expand={false}
        className="justify-content-start  header-nav"
        fixed="top"
        expanded={false}
        onToggle={(toggleState: boolean) => {
          console.log(toggleState);
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
              <LinkContainer to="/" exact>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/imglist">
                <Nav.Link>이상형월드컵</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/textlist">
                <Nav.Link>밸런스게임</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/mytest">
                <Nav.Link>나의 테스트</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/mypage">
                <Nav.Link>정보수정</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <LinkContainer to="/">
              <Nav.Link>즐겨찾기</Nav.Link>
            </LinkContainer>
            <Nav.Item>
              <LinkContainer to="/multistep">
                <Nav.Link>테스트 만들기</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/Login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
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
          <Route path="/modifytest/:id/" component={ModifyGameId} />
          <Route path="/modifytext/:id/" component={ModifyTGameId} />
          <Route path="/*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
