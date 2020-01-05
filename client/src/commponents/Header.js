import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <div style={{ marginBottom: 10 }}>
        <div class="ui secondary pointing menu">
          <Link exact class="item " to="/">
            <i class=" bitcoin icon"></i>
          </Link>
          <Link exact to="/home" class="item">
            Home
          </Link>
          <Link exact to="/api" class="item">
            API
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
