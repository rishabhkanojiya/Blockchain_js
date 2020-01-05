import React, { Component } from "react";
import logo from "../images/undraw_digital_currency_qpak.png";
import { Link } from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <div>
        <div class="two column row">
          <div class=" column">
            <div className="ui left floated big image">
              <img className="" src={logo} alt="Logo" />
            </div>
          </div>
          <div class="right floated column" style={{ alignItems: "right" }}>
            <Link to="home" class="ui teal button" type="submit">
              Access Data
            </Link>
            <Link to="api" class="ui grey button" type="submit">
              Use Api
            </Link>
          </div>
        </div>
      </div>
    );
    // <img src="../images/undraw_digital_currency_qpak.png" />;
  }
}
export default Home;
