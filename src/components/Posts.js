import React, { Component } from "react";

import Imagebox from "./Imagebox";

class Posts extends Component {
  constructor(props) {
    super(props);

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
            id: post.id,
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

  checkExt() {
    var urls = this.state.posts.map(ext => <li>{ext.url.slice(0, -1)}</li>);
    return urls;
  }

  render() {
    return (
      <div>
        <ul>
          {this.checkExt()}{" "}
        </ul>
        {this.state.posts.map(image => (
          <Imagebox key={image.id} src={image.url} />
        ))}
      </div>
    );
  }
}

propTypes: {
  posts: React.PropTypes.array.isRequired;
}

export default Posts;
