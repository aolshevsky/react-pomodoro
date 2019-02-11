import React from "react";
import ReactDOM from "react-dom";
import { InputNumber, Select, Form, Button, Switch } from "antd";

const { Option } = Select;

const modalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
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
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="Schemes" hasFeedback>
              {getFieldDecorator("select", {
                rules: [{ required: false, message: "Please, select schemes!" }]
              })(
                <Select defaultValue="default">
                  <Option value="default">default: 25 5 15 4</Option>
                  <Option value="work">work: 50 10 20 2</Option>
                  <Option value="personal">personal: 30 2 25 4</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Work time">
              {getFieldDecorator("input-number", { initialValue: 25 })(
                <InputNumber min={1} max={60} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Relax time">
              {getFieldDecorator("input-number", { initialValue: 5 })(
                <InputNumber min={1} max={60} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Coffee time">
              {getFieldDecorator("input-number", { initialValue: 15 })(
                <InputNumber min={1} max={60} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Long break(pom.):">
              {getFieldDecorator("input-number", { initialValue: 4 })(
                <InputNumber min={1} max={60} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Notifications">
              {getFieldDecorator("switch", {
                valuePropName: "checkNotification"
              })(<Switch />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Vibration">
              {getFieldDecorator("switch", { valuePropName: "checkVibration" })(
                <Switch />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Sounds">
              {getFieldDecorator("switch", { valuePropName: "checkSounds" })(
                <Switch />
              )}
            </Form.Item>
          </Form>
          <Button onClick={this.props.onClose}>Close</Button>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal = Form.create({})(Modal);

export default Modal;
