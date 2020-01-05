import React, { Component } from "react";
import Axios from "axios";

export class TransBroad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      sender: "",
      recipient: ""
    };
  }

  getBlockChain = async ({ amount, sender, recipient }) => {
    const response = await Axios.post("/api/transaction/broadcast", {
      amount,
      sender,
      recipient
    });
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
            this.getBlockChain(this.state);
            console.log(this.state);
          }}
        >
          <div class="field">
            <label>GET/ transaction/broadcast</label>
            <div class="ui form">
              <div class="fields">
                <div class="field">
                  <label>Amount</label>
                  <input
                    type="text"
                    placeholder="Amount"
                    onChange={e => {
                      this.setState({ amount: e.target.value });
                    }}
                  />
                </div>
                <div class="field">
                  <label>Sender</label>
                  <input
                    type="text"
                    placeholder="Sender"
                    onChange={e => {
                      this.setState({ sender: e.target.value });
                    }}
                  />
                </div>
                <div class="field">
                  <label>Recipient</label>
                  <input
                    type="text"
                    placeholder="Recipient"
                    onChange={e => {
                      this.setState({ recipient: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
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

export default TransBroad;
