import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Checkbox,
  Select,
  Switch,
  Radio,
  message,
} from "antd";
import { connect } from "react-redux";
import { store } from "../selector";
import actions from "../action/vote-action";
// import {getFormItem} from '../../../utils/getFormItem'
import "./index.less";
class AddExtraInfo extends Component {
  formRef = React.createRef();
  fromRefTest = React.createRef();
  layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 10,
    },
  };
  tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  state = {
    optionItems: [],
  };
  render() {
    return (
      <div className="extra-from-wrapper">
        <div className="extra-form-left">
          <Form ref={this.fromRefTest}>
            {this.state.optionItems.map((item) => {
              const {
                content: type,
                label,
                required,
                name,
                options,
                value,
              } = item;
              switch (type) {
                case "input":
                  return (
                    <Form.Item
                      label={label}
                      name={name}
                      rules={[
                        {
                          required: required,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  );
                case "radio":
                  let radioArr = options.split("&");
                  return (
                    <Form.Item
                      label={label}
                      name={name}
                      rules={[
                        {
                          required: required,
                        },
                      ]}
                    >
                      <Radio.Group>
                        {radioArr.map((item) => {
                          return <Radio value={item}>{item}</Radio>;
                        })}
                      </Radio.Group>
                    </Form.Item>
                  );
                case "checkbox":
                  let checkBoxArr = options.split("&");
                  return (
                    <Form.Item
                      label={label}
                      name={name}
                      rules={[
                        {
                          required: required,
                        },
                      ]}
                    >
                      <Checkbox.Group defaultValue={value}>
                        {checkBoxArr.map((item) => {
                          return <Checkbox value={item}>{item}</Checkbox>;
                        })}
                      </Checkbox.Group>
                    </Form.Item>
                  );

                case "select":
                  let selectArr = options.split("&");
                  return (
                    <Form.Item
                      label={label}
                      name={name}
                      rules={[
                        {
                          required: required,
                        },
                      ]}
                    >
                      <Select value={value}>
                        {selectArr.map((item) => {
                          return (
                            <Select.Option value={item}>{item}</Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  );

                default:
                  return <></>;
              }
            })}
          </Form>
        </div>
        <div className="extra-form-right">
          <Form name="extraInfo" {...this.layout} ref={this.formRef}>
            <Form.Item
              label="??????"
              name="content"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Select.Option value="select">?????????</Select.Option>
                <Select.Option value="input">?????????</Select.Option>
                <Select.Option value="radio">?????????</Select.Option>
                <Select.Option value="checkbox">?????????</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="label??????"
              name="label"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="name???" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="????????????"
              name="required"
              initialValue={true}
              rules={[{ required: true }]}
            >
              <Switch
                checkedChildren="???"
                unCheckedChildren="???"
                defaultChecked
              />
            </Form.Item>
            <Form.Item
              label="?????????(??????????????????&??????)"
              name="options"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="?????????" name="value" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...this.tailLayout}>
              <Button onClick={this.addOptionItem}>??????</Button>
            </Form.Item>
            <Form.Item {...this.tailLayout}>
              <Button onClick={this.submit}>??????</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  addOptionItem = async () => {
    const form = this.formRef.current;
    let optionItem = await form.validateFields();
    const { name } = optionItem;
    let flag = true;
    this.state.optionItems.forEach((item) => {
      console.log(item.name, name);
      if (item.name === name) {
        flag = false;
      }
    });
    if (flag) {
      this.setState(
        (preState) => ({ optionItems: [...preState.optionItems, optionItem] }),
        () => {
          message.success("?????????????????????");
        }
      );
    } else {
      message.error("??????????????????name???????????????");
    }
  };
  submit = () => {
    this.props.actions.addVoteExtraInfoAction(this.state.optionItems);
    this.props.actions.changeIndex(3);
    this.props.history.replace("/home/addVote/finishVoteCreate");
  };
}

export default connect(store, actions)(AddExtraInfo);
