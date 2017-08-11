// extracts and cleans up data
function normalizePost(post) {
  return {
    id: post.id,
    title: post.title,
    thumbnail: post.thumbnail,
    url: post.url || "",
    numComments: post.num_comments,
    sourceImage: post.preview.images[0].source.url
  };
}

// Fetch a subreddit's top post
function fetchTopPosts(subreddit) {
  return (
    //fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=100`)
    fetch("https://www.reddit.com/user/316nuts/m/superaww/top.json?limit=100")
      // Parse response as JSON
      .then(res => res.json())
      // Cleanup big JSON mess into posts
      .then(payload => {
        return payload.data.children.map(child => normalizePost(child.data));
      })
      // catch any errors
      .catch(err => {
        console.log("parsing failed", err);
      })
  );
}

export default function fetchPosts() {
  return fetchTopPosts();
}
