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
  }

  // do a fetch request once component mounts
  componentDidMount() {
    PostCall()
      // Save posts into state
      .then(posts => this.setState({ posts: posts }));
    this.filteredPosts();
  }

  // since we only want to work with images, filter out posts that
  // have different extensions
  // only jpg, jpeg, png
  filteredPosts = () => {
    var posts = this.state.posts;
    // handle rejections
    return posts.length > 0
      ? posts.filter(post => {
          if (post.url.match(/(jpg|jpeg|png)/)) return true;
        })
      : undefined;
  };

  // handleclick to get to the next post
  handleNextImage = () => {
    var filtered = this.filteredPosts();
    // make sure it doesnt go over
    var index = this.state.activeIndex + 1 < filtered.length
      ? this.state.activeIndex + 1
      : 0;
    this.setState({ activeIndex: index });
  };

  handlePrevImage = () => {
    var filtered = this.filteredPosts();
    // make sure it doesnt subtract beyond first image
    var index = this.state.activeIndex - 1 < 0 ? 0 : this.state.activeIndex - 1;
    this.setState({ activeIndex: index });
  };

  render() {
    var image = this.filteredPosts();

    return (
      <div>
        {this.state.posts.length > 0
          ? <Imagebox
              src={image[this.state.activeIndex].url}
              key={image[this.state.activeIndex].id}
            />
          : undefined}
        <button onClick={this.handlePrevImage}>
          Previous
        </button>
        <button onClick={this.handleNextImage}>
          Next
        </button>
      </div>
    );
  }
}

export default Posts;
