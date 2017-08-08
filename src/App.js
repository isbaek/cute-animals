import React, { Component } from "react";
import "./App.css";
import Posts from "./components/Posts";
import ErrorPage from "./components/ErrorPage";
import LoadingPage from "./components/LoadingPage";

class App extends Component {
  render() {
    return (
      <div className="App">

        <Posts />
      </div>
    );
  }
}

export default App;
