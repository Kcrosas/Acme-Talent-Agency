import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class _doubleList extends Component {
  constructor() {
    super();
  }

  reducer = (obj, option) => {
    //pull all skillNames as a clean, no object array
    const connClean =
      option === 1
        ? obj.map((e) => `${e.skillName}|${e.skillId} `)
        : obj.map((e) => `${e.clientName}|${e.clientId} `);
    const connReduced = connClean.reduce((a, b) => {
      //create a key for each skillName
      const key = b;
      //Counts the number of occurrences
      a[key] = (a[key] || 0) + 1;
      return a;
    }, {});
    //Bring it into an array
    return Object.entries(connReduced);
  };

  render() {
    const { connections } = this.props;
    const { reducer } = this;
    //Remove duplicates in connections and count number of skill occurrence
    const skillReduced = reducer(connections, 1);
    //Same for clients
    const clientReduced = reducer(connections, 2);
    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Client</td>
                <td>No. of skills</td>
              </tr>

              {clientReduced.map((d) => {
                const splitNameID = d[0].split("|");
                console.log(splitNameID);
                return (
                  <tr>
                    <td>
                      <a href={"#/clients/" + splitNameID[1]}>
                        {splitNameID[0]}
                      </a>
                    </td>
                    <td>({d[1]})</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Skill</td>
                <td>Qualified Clients</td>
              </tr>

              {skillReduced.map((d) => {
                const splitNameID = d[0].split("|");
                return (
                  <tr>
                    <td>
                      <a href={"#/skills/" + splitNameID[1]}>
                        {splitNameID[0]}
                      </a>
                    </td>
                    <td>({d[1]})</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapState = (state) => state;

const doubleList = connect(mapState)(_doubleList);
export default doubleList;
