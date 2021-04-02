// React ---------------------------------------
import React from "react";
import ReactDOM from "react-dom";
// Router ---------------------------------------
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// dotenv ------------------------------------
import dotenv from "dotenv";
dotenv.config();
// Page ---------------------------------------
import Home from "./components/Home/Home.component";
import Header from "./components/Header/Header.component";
import Buttons from "./components/Buttons/Buttons.component";
import Toasts from "./components/Toasts/Toasts.component";
import ImgGame from "./components/ImgGame/ImgGame.component";
// CSS ---------------------------------------
import "./common/styles/global.scss";
// Apollo ---------------------------------------
import { ApolloProvider } from "@apollo/client";
import client from "./common/graphql/client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/buttons" component={Buttons} />
          <Route path="/toasts" component={Toasts} />
          <Route path="/imggame" component={ImgGame} />
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
