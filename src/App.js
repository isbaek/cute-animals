import React, { Component } from "react";
import "./App.css";
import Posts from "./components/Posts";
import DisplayError from "./components/DisplayError";

class App extends Component {
  render() {
    return (
      <div className="App">

        <DisplayError />
      </div>
    );
  }
}

export default App;
