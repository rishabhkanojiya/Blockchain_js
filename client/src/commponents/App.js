import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";
import TableData from "./TableData";
import API from "./Api/API";
import history from "../history";
import Home from "./Home";

export class App extends Component {
  renderTable = () => {
    return (
      <div class="ui row">
        <div class="column">
          <TableData />
        </div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <Router history={history}>
          <div style={{ padding: 3 }}>
            <Header />
          </div>
          <div class="ui container">
            <Switch>
              <div class="ui grid">
                <div class="centered row">
                  <div class="ten wide column">
                    <Route path="/" exact component={Home} />
                  </div>
                </div>
                <Route path="/home" exact>
                  <div class="centered row">
                    <div class="ten wide column">
                      <Input />
                    </div>
                  </div>
                  {this.renderTable()}
                </Route>
                <div>
                  <Route path="/api" exact component={API} />
                </div>
              </div>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
