import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

function JsonDump(props) {
  return (
    <code>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(props.data, null, 4)}
      </pre>
    </code>
  );
}

class App extends Component {
  constructor() {
    super();

    // Initial state
    this.state = {
      posts: null
    };

    // Fetch the data
    this.fetchPosts();
  }

  fetchPosts() {
    // Do request
    fetch("https://www.reddit.com/r/aww/top.json")
      // Parse response as JSON
      .then(res => res.json())
      // Cleanup big JSON mess into posts
      .then(payload => {
        return payload.data.children.map(child => child.data).map(post => {
          return {
            title: post.title,
            thumbnail: post.thumbnail,
            url: post.url,
            numComments: post.num_comments,
            sourceImage: post.preview.images[0].source.url
          };
        });
      })
      // Save posts into state
      .then(posts => this.setState({ posts: posts }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <JsonDump data={this.state.posts} />
        </p>
      </div>
    );
  }
}

export default App;
