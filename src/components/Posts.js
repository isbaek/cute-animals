import React, { Component } from "react";

import Imagebox from "./Imagebox";
import PostCall from "./PostCall";

class Posts extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      posts: [],
      activeIndex: 0
    };

    this.filteredPosts = this.filteredPosts.bind(this);
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handlePrevImage = this.handlePrevImage.bind(this);
  }

  // do a fetch request once component mounts
  componentDidMount() {
    PostCall()
      // Save posts into state
      .then(posts => this.setState({ posts: posts }));
  }

  filteredPosts() {
    return this.state.posts.length > 0
      ? this.state.posts.filter(post => {
          if (post.url.match(/(jpg|jpeg|png)/)) return true;
        })
      : undefined;
  }

  // handleclick to get to the next post
  handleNextImage() {
    var index = this.state.activeIndex + 1 < this.state.posts.length
      ? this.state.activeIndex + 1
      : 0;
    this.setState({ activeIndex: index });
    console.log(index);
  }

  handlePrevImage() {
    var index = this.state.activeIndex - 1 < 0 ? 0 : this.state.activeIndex - 1;
    this.setState({ activeIndex: index });
    console.log(index);
  }

  render() {
    var image = this.state.posts.length > 0 ? this.filteredPosts() : undefined;

    return (
      <div>
        <Imagebox
          src={
            this.state.posts.length > 0
              ? image[this.state.activeIndex].url
              : undefined
          }
          key={
            this.state.posts.length > 0
              ? image[this.state.activeIndex].id
              : undefined
          }
        />
        <button onClick={this.handleNextImage}>Next</button>
      </div>
    );
  }
}

export default Posts;
