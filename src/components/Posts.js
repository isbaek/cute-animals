import React, { Component } from "react";

import Imagebox from "./Imagebox";

class Posts extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      posts: [],
      urls: []
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
            //id: post.id,
            //title: post.title,
            //thumbnail: post.thumbnail,
            url: post.url
            //numComments: post.num_comments,
            //sourceImage: post.preview.images[0].source.url
          };
        });
      })
      // Save posts into state
      .then(posts => this.setState({ posts: posts }));
  }

  // check extension and return jpg elements only
  handleImage() {
    return this.state.posts
      .filter(post => {
        if (post.url.match(/(jpg|jpeg|png)/)) return true; // place your actual check here
      })
      .map(image => {
        return (
          <div>
            <ul><li>{image.url}</li></ul>
          </div>
        );
      });
  }
  render() {
    return (
      <div>
        {this.handleImage()}
      </div>
    );
  }
}

propTypes: {
  posts: React.PropTypes.array.isRequired;
}

export default Posts;
