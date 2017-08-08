import React from "react";
import "./stylesheet/imagebox.css";

function Imagebox(props) {
  return (
    <div className="container">
      <img {...props} />
    </div>
  );
}

export default Imagebox;
