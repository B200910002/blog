import React, { Component } from "react";
import { Fonts } from "../../constants/styles";
import { UserContext } from "../../context/UserContext";

class ViewStory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = UserContext;
  render() {
    const {} = this.context;
    return (
      <>
        <p style={Fonts.largeDark}>Your stories</p>
      </>
    );
  }
}

export default ViewStory;
