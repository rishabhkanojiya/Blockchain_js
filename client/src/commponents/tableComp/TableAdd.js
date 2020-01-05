import React, { Component } from "react";

export class TableAdd extends Component {
  renderList = blockData => {
    return blockData.map(({ amount, sender, recipient, transactionId }) => {
      return (
        <tr key={transactionId}>
          <td>{sender}</td>
          <td>{recipient}</td>
          <td>{amount}</td>
        </tr>
      );
    });
  };

  // renderList = blockData => {
  //   return Object.keys(blockData).map(key => {
  //     if (key === "transactionId") {
  //       return null;
  //     } else {
  //       return (
  //         <tr key={key}>
  //           <td>{key}</td>
  //           <td>{blockData[key]}</td>
  //           <td>{blockData[key]}</td>
  //         </tr>
  //       );
  //     }
  //   });
  // };
  render() {
    return (
      <div>
        <div>
          <div>
            <h2 className="ui centered header">Address</h2>
            <table className="ui teal table">
              <thead>
                <tr>
                  <th className="six wide">Sender</th>
                  <th className="six wide">Recipient</th>
                  <th className="four wide">amount</th>
                </tr>
              </thead>
              <tbody>{this.renderList(this.props.data)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TableAdd;
