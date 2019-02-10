import React, { Component } from "react";

class Pomodoro extends Component {
  state = {
    time: 1500,
    timeType: 1500,
    play: false,
    title: ""
  };

  formatTime(seconds) {
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  getFormatTypes() {
    return [
      { type: "work", time: 1500 },
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
          <button className="btn" onClick={this.handleSetTimeForWork}>
            Work
          </button>
          <button className="btn" onClick={this.handleSetTimeForRelax}>
            Relax
          </button>
          <button className="btn" onClick={this.handleSetTimeForCoffee}>
            Coffee
          </button>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
