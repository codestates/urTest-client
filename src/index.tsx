// React ---------------------------------------
import React from "react";
import ReactDOM from "react-dom";
// Router ---------------------------------------
import { BrowserRouter as Router } from "react-router-dom";
// dotenv ------------------------------------
import dotenv from "dotenv";
dotenv.config();
// App ------------------------------------
import App from "./components/App";
// CSS ---------------------------------------
import "./common/styles/global.scss";
// Apollo ---------------------------------------
import { ApolloProvider } from "@apollo/client";
import client from "./common/graphql/client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
