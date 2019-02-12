import React, { Component } from "react";
import { connect } from "react-redux";
import {
  SET_WORK_TIME,
  SET_RELAX_TIME,
  SET_COFFEE_TIME,
  SET_LONG_BREAK,
  SET_CHECK_NOTIFICATIONS,
  SET_CHECK_SOUNDS,
  WORK_TIME,
  RELAX_TIME,
  COFFEE_TIME
} from "../Actions";
import Mousetrap from "mousetrap";

// Перевести все в минуты!!!!!

class Pomodoro extends Component {
  state = {
    time: this.props.store.workTime,
    timeType: this.props.store.workTime,
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
      this.notifyMe();
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
      { type: WORK_TIME, time: this.props.store.workTime },
      { type: RELAX_TIME, time: this.props.store.relaxTime },
      { type: COFFEE_TIME, time: this.props.store.coffeeTime }
    ];
  }

  formatType(timeType) {
    let timeTypes = this.getFormatTypes();
    for (let tType of timeTypes) {
      if (tType.time === timeType) return tType.type;
    }
    return null;
  }

  setDefaultTime(defaultTime = this.props.store.workTime) {
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
    if (this.state.play) return this.pause();

    return this.play();
  };

  startShortcuts() {
    Mousetrap.bind("space", this.togglePlay);
    Mousetrap.bind("ctrl+q", this.setDefaultTime.bind(this, 30));
  }

  endShortcuts() {
    Mousetrap.unbind("space", this.togglePlay);
  }

  checkTimeType = timeType => {
    if (this.formatType(this.state.timeType) === timeType) return true;

    return false;
  };

  notifyMe() {
    if (Notification.permission !== "granted") Notification.requestPermission();
    else {
      let timeType = this.formatType(this.state.timeType);
      if (timeType === RELAX_TIME || timeType === COFFEE_TIME) {
        new Notification("The time is over!", {
          icon: "img/work.png",
          lang: "en",
          body: "Hey, back to work!"
        });
      } else {
        new Notification("The time is over!", {
          icon: "img/coffee.png",
          lang: "en",
          body: "Hey, time to coffee!"
        });
      }
    }
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
          <button
            className="btn"
            style={{ opacity: this.checkTimeType(WORK_TIME) ? 0.7 : 1 }}
            onClick={() => this.handleSetTimeForWork(this.props.store.workTime)}
          >
            Work
          </button>

          <button
            className="btn"
            style={{ opacity: this.checkTimeType(RELAX_TIME) ? 0.7 : 1 }}
            onClick={() =>
              this.handleSetTimeForRelax(this.props.store.relaxTime)
            }
          >
            Relax
          </button>

          <button
            className="btn"
            style={{ opacity: this.checkTimeType(COFFEE_TIME) ? 0.7 : 1 }}
            onClick={() =>
              this.handleSetTimeForCoffee(this.props.store.coffeeTime)
            }
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

        {/* Bottom section
        ------------------------------- */}
        <div className="bottomBar">
          <div className="controls">
            <div className="controlsLink">
              <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
                What is Pomodoro?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onChangeState: (stateType, stateValue) => {
      dispatch({ type: stateType, value: stateValue });
    }
  })
)(Pomodoro);
