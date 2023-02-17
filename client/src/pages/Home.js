import React, { Component } from "react";
import { Fonts } from "../constants/styles";
import { HomeContext, HomeProvider } from "../context/HomeContext";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HomeProvider>
        <HomeConsumer />
      </HomeProvider>
    );
  }
}

class HomeConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = HomeContext;
  render() {
    // const { grade } = this.context;
    return (
      <HomeContext.Consumer>
        {(context) => (
          <>
            <section><p style={Fonts.largeDark}>Home</p></section>
          </>
        )}
      </HomeContext.Consumer>
    );
  }
}
