import React from "react";
import Imagebox from "./Imagebox";

/* Different types of urls and extensions that need to be dealt with
- .jpg in <img>
- .png in <img>
- .gifv => .webm in <video>
- no ext => push .jpg <img> (imgur)
- gfycat => fat.URL.webm in <video> */

var sample = "https://media.giphy.com/media/xUPGcBlMpJdCUktCta/giphy.gif";

function checkURL(urls) {
  return urls.map(url => url.urls);
}

function checkExt(urls) {
  return this.checkURL().map(url => url.split(".").pop().split(/\#|\?/)[0]);
}

function modify() {
  var sampleg = "http://i.imgur.com/zvATqgs.gifv";
  sampleg.slice(0, -2);
  return sampleg;
}
console.log(modify());

function ext(url) {
  //we only want to get the extension
  url = url.split(".").pop().split(/\#|\?/)[0];

  // Now we have only extension
  return url;
}

function renderImageOrVideo(urls) {
  if (ext === "jpg") {
    return (
      <div>
        {urls.map(image => <Imagebox key={image.id} src={image.url} />)}
        {" "}
      </div>
    );
  } else if (ext === "gif") {
    return (
      <div>
        {this.state.posts.map(image => (
          <iframe key={image.id} src={image.url} />
        ))}
      </div>
    );
  } else {
    console.log("error");
  }
}

export default ext;
