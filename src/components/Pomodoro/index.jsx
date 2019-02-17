import React, { Component } from "react";
import { connect } from "react-redux";
import { SET_TIME, WORK_TIME, RELAX_TIME, COFFEE_TIME } from "../Actions";
import Mousetrap from "mousetrap";

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    const store = this.props.store;
    this.state = {
      timeType: store.workTime[0],
      longBreak: store.longBreak[1],
      play: false
    };
  }

  onChange(value, action) {
    return this.props.onChangeState(action, value);
  }

  onSetTime(value) {
    this.onChange(value, SET_TIME);
  }

  componentDidMount() {
    this.setDefaultTime();
    this.startShortcuts();
    Notification.requestPermission();
  }

  componenentDidUnmount() {
    this.endShortcuts();
  }

  elapseTime = () => {
    if (this.props.store.time === 0) {
      //this.pause();
      let timeType = this.getTimeType();

      if (timeType === WORK_TIME) {
        if (this.state.longBreak !== 1) {
          this.setTime(this.props.store.relaxTime);
        } else {
          this.setTime(this.props.store.coffeeTime);
          this.setLongBreak(this.props.store.longBreak[1]);
        }
      } else if (timeType === RELAX_TIME) {
        this.setTime(this.props.store.workTime);
        this.setLongBreak(this.state.longBreak - 1);
      } else {
        this.setTime(this.props.store.workTime);
      }

      this.notifyMe();
    }
    if (this.state.play) {
      this.onSetTime(this.props.store.time - 1);
    }
  };

  formatTime(seconds) {
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  getTimeType() {
    return this.state.timeType;
  }

  setDefaultTime(defaultTime = this.props.store.workTime) {
    this.setState({
      timeType: defaultTime[0],
      play: false
    });
    this.onSetTime(defaultTime[1]);
  }

  restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  pause(time = this.props.store.time) {
    clearInterval(this.interval);
    this.setState({
      play: false
    });
    this.onSetTime(time);
  }

  play() {
    if (this.state.play || this.props.store.time === 0) return;

    this.restartInterval();

    this.setState({ play: true });
  }

  setTime(newTime) {
    this.restartInterval();

    this.setState({
      timeType: newTime[0],
      play: true
    });
    this.onSetTime(newTime[1]);
  }

  setLongBreak(longBreak) {
    this.setState({
      longBreak: longBreak
    });
  }

  getTitle = () => {
    let timeType = this.getTimeType();
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
    if (this.getTimeType() === timeType) return true;

    return false;
  };

  MinToSec = min => {
    return 60 * min;
  };

  notifyMe() {
    if (Notification.permission !== "granted") Notification.requestPermission();
    else if (this.props.store.checkNotification) {
      let timeType = this.getTimeType();
      if (timeType === WORK_TIME) {
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
          <span className="time">{this.formatTime(this.props.store.time)}</span>

          <span className="timeType">{this.getTitle()} </span>
          <span className="reminderPomodoro">
            Reminder pomodoro: {this.state.longBreak}
          </span>
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
