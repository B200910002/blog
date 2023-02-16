import React, { Component } from "react";
import {} from "../constants/styles";

export default class Loader extends Component {
  // constructor(props) {
  //   super(props);
  // }
  // state = {};
  render() {
    return (
      <div style={styles.container}>
        <div className="loading">
          <span className="shape shape-1"></span>
          <span className="shape shape-2"></span>
          <span className="shape shape-3"></span>
          <span className="shape shape-4"></span>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: "0px",
    padding: "0px",
  },
  loading: {
    width: "120px",
    height: "120px",
    position: "relative",
    margin: "auto",
    backgroundColor: "#eeeeee",
    animation: "spin 2s linear infinite",
    animationDirection: "reverse",
    borderRadius: "30px",
  },
};
