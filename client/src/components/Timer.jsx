import React, { Component } from "react";
import { Fonts } from "../constants/styles";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: 0,
      mounts: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
    if (this.state.seconds >= 59) {
      this.setState({ minutes: this.state.minutes + 1, seconds: 0 });
    }
    if (this.state.minutes >= 59) {
      this.setState({ hours: this.state.hours + 1, minutes: 0 });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div style={Fonts.smallGrayItalic}>
        hours: <label style={Fonts.smallDarkBold}>{this.state.hours}</label>{" "}
        minutes:{" "}
        <label style={Fonts.smallDarkBold}>{this.state.minutes}</label>{" "}
        Seconds:{" "}
        <label style={Fonts.smallDarkBold}>{this.state.seconds}</label>
      </div>
    );
  }
}
