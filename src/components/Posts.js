import React, { Component } from "react";

import Imagebox from "./Imagebox";

class Posts extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      posts: [],
      activeIndex: 0
    };

    // Fetch the data
    this.fetchPosts();
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handlePrevImage = this.handlePrevImage.bind(this);
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
    var filteredPosts = this.state.posts.filter(post => {
      if (post.url.match(/(jpg|jpeg|png)/)) return true;
    });

    return (
      <div>
        {filteredPosts.map(image => (
          <Imagebox src={image.url} key={image.id} />
        ))}
        <button onClick={this.handleNextImage}>Next</button>
      </div>
    );
  }
}

propTypes: {
  posts: React.PropTypes.array.isRequired;
}

export default Posts;
