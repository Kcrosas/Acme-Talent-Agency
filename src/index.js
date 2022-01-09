import { render } from "react-dom";
import React, { Component } from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider, connect } from "react-redux";
import store from "./store";
import doubleList from "./doubleList";
import skillView from "./skillView";
import clientView from "./clientView";

class _App extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    this.props.load();
  }
  render() {
    return (
      <div>
        <h1>Acme Talent Agency</h1>
        <Router>
          <Switch>
            <Route path="/skills/:id" component={skillView} />
            <Route path="/clients/:id" component={clientView} />
            <Route path="/" component={doubleList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

//Store's state inside props and is accessed in a class function 'this.props'
const getState = (state) => state;
const getDispatch = (dispatch) => {
  return {
    load: async () => {
      const clients = (await axios.get("/api/clients")).data;
      const skills = (await axios.get("/api/skills")).data;
      const connections = (await axios.get("/api/connections")).data;
      dispatch({
        type: "FIRST_LOAD",
        clients,
        skills,
        connections,
      });
    },
  };
};

//auto subscribe/unsubscribe to the store  along with either a local set of dispatch functions or ones from the store
const App = connect(getState, getDispatch)(_App);

//Wraps parent element App (above) with a provider so everything in App and its child element has access to state (as long as 'connect' is used)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
