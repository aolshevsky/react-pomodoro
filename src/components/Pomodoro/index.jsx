import React, { Component } from "react";

class Pomodoro extends Component {
  state = {
    time: 0,
    play: false,
    title: ""
  };

  render() {
    return (
      <div>
        <span className="badge badge-primary badge m-2">Pomodoro</span>
      </div>
    );
  }
}

export default Pomodoro;
