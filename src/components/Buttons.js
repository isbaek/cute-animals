import React from "react";
import "./stylesheet/buttons.css";

import Next from "react-icons/lib/md/arrow-forward";
import Prev from "react-icons/lib/md/arrow-back";

export function NextButton(props) {
  return (
    <button onClick={props.onClick}><Next size={50} color="white" /></button>
  );
}

export function PrevButton(props) {
  return (
    <button onClick={props.onClick}><Prev size={50} color="white" /></button>
  );
}
