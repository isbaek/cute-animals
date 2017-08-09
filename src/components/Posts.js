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
    const posts = this.state.posts;
    // handle rejections
    return posts.filter(post => Boolean(post.url.match(/(jpg|jpeg|png)/)));
  };

  // handleclick to get to the next post
  handleNextImage = () => {
    const filtered = this.filteredPosts();
    // Loop back to beginning if we're going to "overflow"
    const index = this.state.activeIndex + 1 < filtered.length
      ? this.state.activeIndex + 1
      : 0;
    this.setState({ activeIndex: index });
  };

  handlePrevImage = () => {
    // make sure it doesnt go backwards beyond first image
    const index = Math.max(this.state.activeIndex - 1, 0);
    this.setState({ activeIndex: index });
  };

  render() {
    var content;

    // if loading, display loader
    if (this.state.isLoading) {
      return <LoadingPage />;
    }

    const images = this.filteredPosts();

    return (
      <div className="container">
        <PrevButton onClick={this.handlePrevImage} />
        <Imagebox
          src={images[this.state.activeIndex].url}
          key={images[this.state.activeIndex].id}
        />
        <NextButton onClick={this.handleNextImage} />
      </div>
    );
  }
}

export default Posts;
