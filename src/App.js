import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";
import { Button } from "antd";
import "./App.css";

const initialState = {
  workTime: 25,
  relaxTime: 5,
  coffeTime: 15,
  longBreak: 4,
  checkNotification: false,
  checkSounds: false
};

function settings(state = initialState, action) {
  switch (action.type) {
    case SET_WORK_TIME:
      return Object.assign({}, state, {
        workTime: action.workTime
      });
    case SET_RELAX_TIME:
      return Object.assign({}, state, {
        relaxTime: action.relaxTime
      });
    case SET_COFFEE_TIME:
      return Object.assign({}, state, {
        coffeTime: action.coffeTime
      });
    case SET_LONG_BREAK:
      return Object.assign({}, state, {
        longBreak: action.longBreak
      });
    case SET_CHECK_NOTIFICATIONS:
      return Object.assign({}, state, {
        checkNotification: action.checkNotification
      });
    case SET_CHECK_SOUNDS:
      return Object.assign({}, state, {
        checkSounds: action.checkSounds
      });
    default:
      return state;
  }
}

const store = createStore(settings);

class App extends React.Component {
  state = { showSettings: false };
  handleShowMessageClick = () => this.setState({ showSettings: true });
  handleCloseSettings = () => this.setState({ showSettings: false });
  render() {
    return (
      <div className="app">
        <Button
          className="btn"
          icon={"img/settings"}
          onClick={this.handleShowMessageClick}
        >
          Settings
        </Button>
        <Provider store={store}>
          {this.state.showSettings ? (
            <Settings onClose={this.handleCloseSettings}>
              Pomodoro settings!
            </Settings>
          ) : null}
          <Pomodoro />
        </Provider>
      </div>
    );
  }
}

export default App;
