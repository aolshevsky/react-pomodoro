import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { InputNumber, Select, Form, Button, Switch } from "antd";
import {
  SET_WORK_TIME,
  SET_RELAX_TIME,
  SET_COFFEE_TIME,
  SET_LONG_BREAK,
  SET_CHECK_NOTIFICATIONS,
  SET_CHECK_SOUNDS
} from "../Actions";

const { Option } = Select;

const settingsRoot = document.getElementById("settings-root");

class Settings extends React.Component {
  onChange(value, action) {
    return this.props.onChangeState(action, value);
  }

  onSelectChange(e) {
    if (e === "work") {
      this.onChange(50, SET_WORK_TIME);
      this.onChange(10, SET_RELAX_TIME);
      this.onChange(20, SET_COFFEE_TIME);
      this.onChange(2, SET_LONG_BREAK);
    } else if (e === "personal") {
      this.onChange(30, SET_WORK_TIME);
      this.onChange(2, SET_RELAX_TIME);
      this.onChange(25, SET_COFFEE_TIME);
      this.onChange(4, SET_LONG_BREAK);
    } else if (e === "default") {
      this.onChange(25, SET_WORK_TIME);
      this.onChange(5, SET_RELAX_TIME);
      this.onChange(15, SET_COFFEE_TIME);
      this.onChange(4, SET_LONG_BREAK);
    }
  }

  render() {
    console.log(this.props.store);

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
                  onChange={e => this.onChange(e, SET_WORK_TIME)}
                  value={this.props.store.workTime[1]}
                  min={1}
                  max={60}
                />
              }
              <span className="ant-form-text"> minuties</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Relax time">
              {
                <InputNumber
                  onChange={e => this.onChange(e, SET_RELAX_TIME)}
                  value={this.props.store.relaxTime[1]}
                  min={1}
                  max={60}
                />
              }
              <span className="ant-form-text"> minuties</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Coffee time">
              {
                <InputNumber
                  onChange={e => this.onChange(e, SET_COFFEE_TIME)}
                  value={this.props.store.coffeeTime[1]}
                  min={1}
                  max={60}
                />
              }
              <span className="ant-form-text"> minuties</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Long break:">
              {
                <InputNumber
                  onChange={e => this.onChange(e, SET_LONG_BREAK)}
                  value={this.props.store.longBreak[1]}
                  min={1}
                  max={60}
                />
              }
              <span className="ant-form-text"> pomodoros</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Notifications">
              {
                <Switch
                  onChange={e => this.onChange(e, SET_CHECK_NOTIFICATIONS)}
                  checked={this.props.store.checkNotification}
                />
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="Sounds">
              {
                <Switch
                  onChange={e => this.onChange(e, SET_CHECK_SOUNDS)}
                  value={this.props.store.checkSounds}
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

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onChangeState: (stateType, stateValue) => {
      dispatch({ type: stateType, value: stateValue });
    }
  })
)(Settings);
