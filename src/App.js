import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";
import { Button } from "antd";
import "./App.css";
import {
  SET_WORK_TIME,
  SET_RELAX_TIME,
  SET_COFFEE_TIME,
  SET_LONG_BREAK,
  SET_CHECK_NOTIFICATIONS,
  SET_CHECK_SOUNDS
} from "./components/Actions";

const initialState = {
  workTime: 25,
  relaxTime: 5,
  coffeeTime: 15,
  longBreak: 4,
  checkNotification: false,
  checkSounds: false
};

function settings(state = initialState, action) {
  switch (action.type) {
    case SET_WORK_TIME:
      return Object.assign({}, state, {
        workTime: action.value
      });
    case SET_RELAX_TIME:
      return Object.assign({}, state, {
        relaxTime: action.value
      });
    case SET_COFFEE_TIME:
      return Object.assign({}, state, {
        coffeTime: action.value
      });
    case SET_LONG_BREAK:
      return Object.assign({}, state, {
        longBreak: action.value
      });
    case SET_CHECK_NOTIFICATIONS:
      return Object.assign({}, state, {
        checkNotification: action.value
      });
    case SET_CHECK_SOUNDS:
      return Object.assign({}, state, {
        checkSounds: action.value
      });
    default:
      return state;
  }
}

const store = createStore(settings);

store.subscribe(() => console.log(store.getState()));

class App extends React.Component {
  state = { showSettings: false };
  handleShowMessageClick = () => this.setState({ showSettings: true });
  handleCloseSettings = () => this.setState({ showSettings: false });
  render() {
    return (
      <div className="app">
        <Button
          className="btn"
          icon={"settings.png"}
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
