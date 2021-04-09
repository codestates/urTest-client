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

const App = () => {
  const [isSideBarOpen, setSideBarState] = useState(false);
  const history = useHistory();
  useEffect(() => {
    console.log("App Mounted !!");
    const deregisterListener = history.listen(() => {
      console.log("on route change");
      setSideBarState(false);
    });
    return () => {
      deregisterListener();
    };
  }, [history]);

  return (
    <>
      <Navbar
        bg="light"
        expand="xl"
        variant="light"
        className="justify-content-start"
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
              <LinkContainer to="/imggame">
                <Nav.Link>Img Game</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/multistep">
                <Nav.Link>만들기 테스트</Nav.Link>
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
          <Route path="/imglist" component={ImgList} />
          <Route path="/textlist" component={TextList} />
          <Route path="/searchlist" component={SearchList} />
          <Route path="/login" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/multistep" component={Multistep} />
          <Route path="/*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
