import React from "react";
import Imagebox from "./Imagebox";

var sample = "https://media.giphy.com/media/xUPGcBlMpJdCUktCta/giphy.gif";

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

function checkExt(url) {
  if (ext === "jpg") {
    return (
      <div>
        {this.state.posts.map(image => (
          <Imagebox key={image.id} src={image.url} />
        ))}
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
