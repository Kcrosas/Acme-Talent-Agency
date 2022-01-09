import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class _skillView extends Component {
  constructor() {
    super();
  }

  //axios get route here

  render() {
    return <form></form>;
  }
}

const mapState = (state) => state;

const skillView = connect(mapState)(_skillView);
export default skillView;
