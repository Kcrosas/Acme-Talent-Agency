import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class _clientView extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    if (!this.props.clients) {
      return null;
    }
    let id = window.location.hash.slice(-1) * 1;
    const { clients } = this.props;
    let specific = clients.filter((e) => e.id === id);
    console.log(specific[0].name);
    return <div>Hello</div>;
  }
}

const mapState = (state) => state;

const clientView = connect(mapState)(_clientView);
export default clientView;
