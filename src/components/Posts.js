import React, { Component } from "react";

import Imagebox from "./Imagebox";
import LoadingPage from "./LoadingPage";
import fetchPosts from "../utils/fetchPosts";

// import button elements
import { NextButton, PrevButton } from "./Buttons";

class Posts extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      posts: [],
      activeIndex: 0,
      isLoading: true
    };
  }

  // do a fetch request once component mounts
  componentDidMount() {
    fetchPosts()
      // Save posts into state
      .then(posts => this.setState({ posts: posts, isLoading: false }));
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
    // make sure it doesnt go backwards beyond first image
    var index = this.state.activeIndex - 1 < 0 ? 0 : this.state.activeIndex - 1;
    this.setState({ activeIndex: index });
  };

  render() {
    var content;
    var image = this.filteredPosts();

    // if loading, display loader
    if (this.state.isLoading) {
      return <LoadingPage />;
    }

    return (
      <div className="container">
        <PrevButton onClick={this.handlePrevImage} />
        <Imagebox
          src={image[this.state.activeIndex].url}
          key={image[this.state.activeIndex].id}
        />
        <NextButton onClick={this.handleNextImage} />
      </div>
    );
  }
}

export default Posts;
