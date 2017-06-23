import React, { Component } from "react";

function Imagebox(props) {
  return (
    <div style={styles.container}>
      <img style={styles.image} {...props} />
    </div>
  );
}

var styles = {
  container: {
    maxWidth: "700px",
    maxHeight: "900px",
    margin: "50px",
    border: "5px solid black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  image: {
    width: "100%",
    height: "auto"
  }
};

export default Imagebox;
