import React, { Component } from "react";
import Axios from "axios";

export class Mine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blockchain: ""
    };
  }

  getBlockChain = async () => {
    const response = await Axios.get("/api/mine");
    this.setState({ blockchain: JSON.stringify(response.data, null, 4) });
    console.log(this.state.blockchain);
  };
  renderData = () => {
    if (this.state.blockchain) {
      return (
        <div>
          <div class="ui raised segment">
            <pre>{this.state.blockchain}</pre>
          </div>
          <div class="ui divider" />
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <form
          class="ui form"
          onSubmit={e => {
            e.preventDefault();
            this.getBlockChain();
          }}
        >
          <div class="field">
            <label>GET/ mine</label>
            {/* <p>http://localhost:3001/mine</p> */}
          </div>
          <button class="ui teal button" type="submit">
            Submit
          </button>
        </form>
        <div class="ui divider"></div>

        <div>{this.renderData()}</div>
      </div>
    );
  }
}

export default Mine;
