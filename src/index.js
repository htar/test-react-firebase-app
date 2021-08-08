import React from "react";
import { render } from "react-dom";

import "./index.scss";

import Application from "./components/Application";
import PostsProvider from "./providers/PostsProvider";

import { BrowserRouter as Router } from "react-router-dom";

render(
  <Router>
    <PostsProvider>
      <Application />
    </PostsProvider>
  </Router>,
  document.getElementById("root")
);
