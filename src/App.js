import React from "react";
import Pomodoro from "./components/Pomodoro";
import Modal from "./components/Settings";
import "./App.css";

class App extends React.Component {
  state = { showModal: false };
  handleShowMessageClick = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });
  render() {
    return (
      <div className="app">
        <button className="btn" onClick={this.handleShowMessageClick}>
          Settings
        </button>
        {this.state.showModal ? (
          <Modal onClose={this.handleCloseModal}>
            This is the Pomodoro settings!
          </Modal>
        ) : null}
        <Pomodoro />
      </div>
    );
  }
}

export default App;
