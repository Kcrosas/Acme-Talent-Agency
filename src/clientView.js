import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class _clientView extends Component {
  constructor() {
    super();
  }

  render() {
    return <div>Goodbye World</div>;
  }
}

const mapState = (state) => state;

const clientView = connect(mapState)(_clientView);
export default clientView;
