import React from "react";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";
import { Button } from "antd";
import "./App.css";

class App extends React.Component {
  state = { showSettings: false };
  handleShowMessageClick = () => this.setState({ showSettings: true });
  handleCloseSettings = () => this.setState({ showSettings: false });
  render() {
    return (
      <div className="app">
        <Button className="btn" onClick={this.handleShowMessageClick}>
          Settings
        </Button>
        {this.state.showSettings ? (
          <Settings onClose={this.handleCloseSettings}>
            Pomodoro settings!
          </Settings>
        ) : null}
        <Pomodoro />
      </div>
    );
  }
}

export default App;
