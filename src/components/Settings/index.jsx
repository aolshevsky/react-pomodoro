import React from "react";
import ReactDOM from "react-dom";
import { InputNumber, Select, Form, Button, Switch } from "antd";

const { Option } = Select;

const settingsRoot = document.getElementById("settings-root");

class Settings extends React.Component {
  state = {
    workTime: 25,
    relaxTime: 5,
    coffeTime: 15,
    longBreak: 4,
    checkNotification: false,
    checkVibration: true,
    checkSounds: false
  };

  onChange(e, value) {
    this.setState({
      [value]: e
    });
  }

  onSelectChange(e) {
    if (e === "work") {
      this.setState({
        workTime: 50,
        relaxTime: 10,
        coffeTime: 20,
        longBreak: 2
      });
    } else if (e === "personal") {
      this.setState({
        workTime: 30,
        relaxTime: 2,
        coffeTime: 25,
        longBreak: 4
      });
    } else if (e === "default") {
      this.setState({
        workTime: 25,
        relaxTime: 5,
        coffeTime: 15,
        longBreak: 4
      });
    }
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return ReactDOM.createPortal(
      <div
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)"
        }}
      >
        <div
          style={{
            padding: 20,
            background: "#ecf0f1",
            opacity: 0.9,
            borderRadius: "2px",
            display: "inline-block",
            minHeight: "600px",
            margin: "1rem",
            position: "relative",
            minWidth: "600px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
            justifySelf: "center"
          }}
        >
          {this.props.children}
          <hr />
          <Form>
            <Form.Item {...formItemLayout} label="Schemes" hasFeedback>
              {
                <Select
                  onChange={e => this.onSelectChange(e)}
                  defaultValue="default"
                >
                  <Option value="default">default: 25 5 15 4</Option>
                  <Option value="work">work: 50 10 20 2</Option>
                  <Option value="personal">personal: 30 2 25 4</Option>
                </Select>
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="Work time">
              {
                <InputNumber
                  onChange={e => this.onChange(e, "workTime")}
                  value={this.state.workTime}
                  min={1}
                  max={60}
                />
              }
              <span className="ant-form-text"> minuties</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Relax time">
              {
                <InputNumber
                  onChange={e => this.onChange(e, "relaxTime")}
                  value={this.state.relaxTime}
                  min={1}
                  max={60}
                />
              }
              <span className="ant-form-text"> minuties</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Coffee time">
              {
                <InputNumber
                  onChange={e => this.onChange(e, "coffeeTime")}
                  value={this.state.coffeTime}
                  min={1}
                  max={60}
                />
              }
              <span className="ant-form-text"> minuties</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Long break:">
              {
                <InputNumber
                  onChange={e => this.onChange(e, "longBreak")}
                  value={this.state.longBreak}
                  min={1}
                  max={60}
                />
              }
              <span className="ant-form-text"> pomodoros</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Notifications">
              {
                <Switch
                  onChange={e => this.onChange(e, "checkNotification")}
                  checked={this.state.checkNotification}
                />
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="Vibration">
              {
                <Switch
                  onChange={e => this.onChange(e, "checkVibration")}
                  checked={this.state.checkVibration}
                />
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="Sounds">
              {
                <Switch
                  onChange={e => this.onChange(e, "checkSounds")}
                  value={this.state.checkSounds}
                />
              }
            </Form.Item>
          </Form>
          <Button onClick={this.props.onClose}>Close</Button>
        </div>
      </div>,
      settingsRoot
    );
  }
}

Settings = Form.create({})(Settings);

export default Settings;
