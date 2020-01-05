import React, { Component } from "react";
import Blockchain from "./Blockchain";
import TransBroad from "./TransBroad";
import Mine from "./Mine";

export class API extends Component {
  render() {
    return (
      <div>
        <Blockchain />
        <TransBroad />
        <Mine />
      </div>
    );
  }
}

export default API;
