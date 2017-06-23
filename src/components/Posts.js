import React, { Component } from "react";

function JsonDump(props) {
  return (
    <code>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(props.data, null, 4)}
      </pre>
    </code>
  );
}

function test(props) {
  return <div>{props.data}</div>;
}

class Posts extends Component {
  constructor() {
    super();

    // Initial state
    this.state = {
      posts: []
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
    return <ul>{this.state.posts.map(header => <li>{header.title}</li>)}</ul>;
  }
}

propTypes: {
  posts: React.PropTypes.array.isRequired;
}

export default Posts;
