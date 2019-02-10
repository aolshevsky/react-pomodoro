import React, { Component } from "react";

class Pomodoro extends Component {
  state = {
    time: 0,
    timeType: 0,
    play: false
  };

  componentDidMount() {
    this.setDefaultTime();
    Notification.requestPermission();
  }

  elapseTime = () => {
    if (this.state.time === 0) {
      this.reset();
    }
    if (this.state.play === true) {
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

  reset(time = this.state.time) {
    clearInterval(this.interval);
    this.setState({
      time: time,
      play: false
    });
  }

  setTime(newTime) {
    this.restartInterval();

    this.setState({
      time: newTime,
      timeType: newTime,
      play: true
    });
  }

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
          <span className="timeType">
            The {this.formatType(this.state.timeType)} time!
          </span>
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
      </div>
    );
  }
}

export default Pomodoro;
