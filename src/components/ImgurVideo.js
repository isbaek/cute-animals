////
// take imgur video url and convert to become viewable
////
import React from "react";

var sampleURL = "http://i.imgur.com/zvATqgs.gifv";

function cleanToMP4(url) {
  return url.replace(".gifv", ".mp4");
}

// get raw dom to set webkit plays in line attribute
function attachCustomAttributes(domNode) {
  if (domNode) {
    domNode.setAttribute("webkit-playsinline", true);
  }
}

function ImgurVideo({ src, ...props }) {
  return (
    <video
      preload="auto"
      autoPlay="autoplay"
      muted="muted"
      loop="loop"
      ref={attachCustomAttributes}
      {...props}
    >
      <source src={cleanToMP4(src)} type="video/mp4" />
    </video>
  );
}

export default ImgurVideo;
