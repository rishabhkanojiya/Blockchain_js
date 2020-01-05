import React, { Component } from "react";
import { connect } from "react-redux";
import TableDataMain from "./tableComp/TableDataMain";
import TableAdd from "./tableComp/TableAdd";

export class TableData extends Component {
  renderData = () => {
    switch (this.props.inputs) {
      case "Block":
        if (this.props.blockData != null) {
          return (
            <TableDataMain
              name="Block Information"
              data={this.props.blockData}
            />
          );
        }
        break;
      case "Transaction":
        if (this.props.transaction != null) {
          return (
            <TableDataMain name="Transactions" data={this.props.transaction} />
          );
        }
        break;
      case "Address":
        if (this.props.address != null) {
          return <TableAdd data={this.props.address} />;
        }
        break;

      default:
        return null;
    }
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div class="ui raised segment">
          <div class="ui placeholder">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      );
    }
    return <div>{this.renderData()}</div>;
  }
}

const mapStateToProps = state => ({
  blockData: state.blockData.payload.Block,
  isLoading:
    state.blockData.isLoading ||
    state.transaction.isLoading ||
    state.address.isLoading,
  transaction: state.transaction.payload.transaction,
  address: state.address.payload,
  inputs: state.inputs.option
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
