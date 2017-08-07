// make a fetch api request to the reddit subforums

// will use top posts in 'aww' subreddit as example
var url = "https://www.reddit.com/r/aww/top.json";

export default function PostCall() {
  // do request
  return (
    fetch(url)
      // Parse response as JSON
      .then(res => res.json())
      // catch any errors
      .catch(err => {
        console.log("parsing failed", err);
      })
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
  );
}
