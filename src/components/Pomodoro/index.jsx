import React, { Component } from "react";

import Mousetrap from "mousetrap";

class Pomodoro extends Component {
  state = {
    time: 15,
    timeType: 15,
    play: false
  };

  componentDidMount() {
    this.setDefaultTime();
    this.startShortcuts();
    Notification.requestPermission();
  }

  componenentDidUnmount() {
    this.endShortcuts();
  }

  elapseTime = () => {
    if (this.state.time === 0) {
      this.pause();
    }
    if (this.state.play) {
      this.setState({ time: this.state.time - 1 });
    }
  };

  formatTime(seconds) {
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  getFormatTypes() {
    return [
      { type: "work", time: 15 },
      { type: "relax", time: 300 },
      { type: "coffee", time: 900 }
    ];
  }

  formatType(timeType) {
    let timeTypes = this.getFormatTypes();
    for (let tType of timeTypes) {
      if (tType.time === timeType) return tType.type;
    }
    return null;
  }

  setDefaultTime() {
    let defaultTime = 15;

    this.setState({
      time: defaultTime,
      timeType: defaultTime,
      play: false
    });
  }

  restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  pause(time = this.state.time) {
    clearInterval(this.interval);
    this.setState({
      time: time,
      play: false
    });
  }

  play() {
    if (this.state.play) return;

    this.restartInterval();

    this.setState({ play: true });
  }

  setTime(newTime) {
    this.restartInterval();

    this.setState({
      time: newTime,
      timeType: newTime,
      play: true
    });
  }

  getTitle = () => {
    let timeType = this.formatType(this.state.timeType);
    if (this.state.play) return "It's time to " + timeType + " !";
    return timeType.charAt(0).toUpperCase() + timeType.slice(1) + " is paused!";
  };

  togglePlay = () => {
    if (this.state.play) return this.handlePause();

    return this.handlePlay();
  };

  startShortcuts() {
    Mousetrap.bind("space", this.togglePlay);
  }

  endShortcuts() {
    Mousetrap.unbind("space", this.togglePlay);
  }

  handlePlay = () => {
    this.play();
  };

  handlePause = () => {
    this.pause();
  };

  handleSetTimeForCoffee = newTime => {
    this.setTime(newTime);
  };

  handleSetTimeForRelax = newTime => {
    this.setTime(newTime);
  };

  handleSetTimeForWork = newTime => {
    this.setTime(newTime);
  };

  render() {
    return (
      <div className="pomodoro">
        <div className="container display">
          <span className="time">{this.formatTime(this.state.time)}</span>
          <span className="timeType">{this.getTitle()}</span>
        </div>

        <div className="container display">
          <button className="btn" onClick={() => this.handleSetTimeForWork(15)}>
            Work
          </button>
          <button
            className="btn"
            onClick={() => this.handleSetTimeForRelax(300)}
          >
            Relax
          </button>
          <button
            className="btn"
            onClick={() => this.handleSetTimeForCoffee(900)}
          >
            Coffee
          </button>
        </div>

        <div className="container">
          <button
            className="play btnIcon"
            style={{ opacity: this.state.play ? 0.4 : 1 }}
            onClick={this.handlePlay}
          />
          <button
            className="stop btnIcon"
            style={{ opacity: !this.state.play ? 0.4 : 1 }}
            onClick={this.handlePause}
          />
        </div>
      </div>
    );
  }
}

export default Pomodoro;
