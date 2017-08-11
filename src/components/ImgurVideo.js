////
// take imgur video url and convert to become viewable
////
import React from "react";

var sampleURL = "http://i.imgur.com/zvATqgs.gifv";

function cleanToMP4(url) {
  return url.replace(".gifv", ".mp4");
}

function ImgurVideo({ src, ...props }) {
  return (
    <video
      preload="auto"
      autoPlay="autoplay"
      muted="muted"
      loop="loop"
      {...props}
    >
      <source src={cleanToMP4(src)} type="video/mp4" />
    </video>
  );
}

export default ImgurVideo;
