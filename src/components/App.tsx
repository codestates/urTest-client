import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
// Page ---------------------------------------
import Home from "./Home/Home.component";
import Header from "./Header/Header.component";
import Buttons from "./Buttons/Buttons.component";
import Toasts from "./Toasts/Toasts.component";
import ImgGame from "./ImgGame/ImgGame.component";
import SideDrawer from "./Sidebar/sidedrawer";
// bootstrap ---------------------------
import { Nav, Navbar } from "react-bootstrap";
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
        expand={false}
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
        <Nav>
          <Nav.Item>
            <LinkContainer to="/" exact>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/buttons">
              <Nav.Link>Buttons</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/toasts">
              <Nav.Link>Toasts</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/imggame">
              <Nav.Link>Img Game</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/dsklfjeklsfjelwfo i¨≈vj˚µ≈˜ kfgljsio juflodxjfvkl xjldfgvjklsjfl k ">
              <Nav.Link>404</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </SideDrawer>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/buttons" component={Buttons} />
        <Route path="/toasts" component={Toasts} />
        <Route path="/imggame" component={ImgGame} />
        <Route path="/*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
};

export default App;
