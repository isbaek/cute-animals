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

  prevIndex = () => {
    return Math.max(this.state.activeIndex - 1, 0);
  }

  nextIndex = () => {
    const index = this.state.activeIndex;
    const max = this.filteredPosts().length;
    // Loop back to beginning if we're going to "overflow"
    if (index + 1 >= max) {
      return 0;
    }
    return index + 1;
  }

  // handleclick to get to the next post
  handleNextImage = () => {
    this.setState({ activeIndex: this.nextIndex() });
  };
  handlePrevImage = () => {
    this.setState({ activeIndex: this.prevIndex() });
  };

  // Image getters
  activeImage = () => { return this.filteredPosts()[this.state.activeIndex];}
  prevImage = () => { return this.filteredPosts()[this.prevIndex()]; }
  nextImage = () => { return this.filteredPosts()[this.nextIndex()]; }

  render() {
    // if loading, display loader
    if (this.state.isLoading) {
      return <LoadingPage />;
    }

    return (
      <div className="container">
        <PrevButton onClick={this.handlePrevImage} />
        <Imagebox
          onClick={this.handleNextImage}
          src={this.activeImage().url}
          key={this.activeImage().id}
        />
        <img style={{display: 'none'}} src={this.prevImage().url} />
        <img style={{display: 'none'}} src={this.nextImage().url} />
        <NextButton onClick={this.handleNextImage} />
      </div>
    );
  }
}

export default Posts;
