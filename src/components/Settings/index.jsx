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
      <div className="settingsShadow">
        <div className="settings">
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
