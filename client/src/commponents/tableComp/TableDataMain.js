import React, { Component } from "react";

export class TableDataMain extends Component {
  renderList = blockData => {
    return Object.keys(blockData).map(key => {
      if (key === "transactions" || key === "previousBlockHash") {
        return null;
      } else {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{blockData[key]}</td>
          </tr>
        );
      }
    });
  };
  render() {
    return (
      <div>
        <div>
          <h2 className="ui centered header">{this.props.name}</h2>
          <table className="ui teal table">
            <thead>
              <tr>
                <th className="four wide">Data</th>
                <th className="twelve wide">Value</th>
              </tr>
            </thead>
            <tbody>{this.renderList(this.props.data)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableDataMain;
