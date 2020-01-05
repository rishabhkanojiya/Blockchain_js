import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchInput,
  fetchData,
  fetchTransaction,
  fetchAddress
} from "../actions";

export class Input extends Component {
  constructor() {
    super();
    this.state = { value: "", option: "Block" };
  }

  getData = option => {
    switch (option) {
      case "Block":
        this.props.fetchData(this.state.value);
        break;

      case "Transaction":
        this.props.fetchTransaction(this.state.value);
        break;

      case "Address":
        this.props.fetchAddress(this.state.value);
        break;

      default:
        return null;
    }
  };
  render() {
    return (
      <div>
        <form
          className="ui form"
          onSubmit={e => {
            e.preventDefault();
            this.props.fetchInput(this.state);
            this.getData(this.state.option);
          }}
        >
          <div className="fields">
            <div className="eight wide field">
              <input
                type="text"
                name="first-name"
                placeholder="Hash"
                onChange={e => {
                  this.setState({ value: e.target.value });
                }}
              />
            </div>
            <div className="four wide field">
              <select
                className="ui compact selection dropdown"
                onChange={e => {
                  this.setState({ option: e.target.value });
                }}
              >
                <option value="Block">Block</option>
                <option value="Transaction">Transaction</option>
                <option value="Address">Address</option>
              </select>
            </div>
            <div className="field">
              <button className="ui teal button" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  fetchInput,
  fetchTransaction,
  fetchAddress,
  fetchData
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
