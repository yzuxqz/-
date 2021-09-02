import React, { Component } from "react";
import {
  Form,
  Input,
  InputNumber,
  Tooltip,
  Radio,
  Button,
  Divider,
  message,
  notification,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "./index.less";
import { checkData } from "../../utils/checkData";

import { getMessage } from "../../network/login/login";
import { register } from "../../network/register/register";

class Register extends Component {
  state = {
    loadingMessage: false, //记录获取验证码状态
    count: 61, //记录重新获取验证码的时间
  };
  formItemLayout = {
    labelCol: {
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      sm: {
        span: 14,
      },
    },
  };
  tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 20,
        offset: 2,
      },
    },
  };
  formRef = React.createRef();

  render() {
    const { loadingMessage, count } = this.state;
    return (
      <div className="register-wrapper">
        <div className="register-form">
          <Divider className="register-title">注册新用户</Divider>
          <Form
            {...this.formItemLayout}
            ref={this.formRef}
            name="register"
            scrollToFirstError
          >
            <Form.Item
              name="userName"
              label={
                <span>
                  用户名&nbsp;{" "}
                  <Tooltip title="你想让别人如何称呼你？">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "用户名不能为空",
                },
                {
                  validator: checkData,
                },
                {
                  max: 20,
                  message: "用户名不能超过20字节",
                },
              ]}
              hasFeedback
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: "email",
                  message: "邮箱格式错误",
                },
                {
                  required: true,
                  message: "邮箱不能为空",
                },
              ]}
              hasFeedback
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="age"
              label="年龄"
              rules={[
                {
                  required: true,
                  message: "年龄不能为空",
                },
                {
                  type:"number",
                  min: 1,
                  message: "年龄不能小于1"
                }, {
                  type:"number",
                  max: 120,
                  message: "年龄不能大于120"
                }
              ]}
              hasFeedback
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="sex"
              label="性别"
              rules={[
                {
                  required: true,
                  message: "性别不能为空",
                },
              ]}
              hasFeedback
            >
              <Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                {
                  required: true,
                  message: "手机号不能为空",
                },
                {
                  pattern: new RegExp(
                    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                  ),
                  message: "该手机号无效",
                },
              ]}
              hasFeedback
            >
              <Input
                addonBefore="+86"
                style={{
                  width: "100%",
                }}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="verifyMessage"
              label="验证码"
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 6,
                  message: "有效验证码为6位数",
                },
              ]}
            >
              <Input
                style={{ padding: "0px", paddingLeft: "1vw" }}
                suffix={
                  <Button
                    type="primary"
                    style={{ fontSize: "12px", padding: "2px" }}
                    onClick={this.getMessage}
                    loading={loadingMessage}
                  >
                    {count === 61 ? "获取验证码" : `${count}s后重新获取`}
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "密码",
                },
                {
                  max: 20,
                  message: "密码不能超过20字节",
                },
              ]}
              hasFeedback
            >
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item {...this.tailFormItemLayout}>
              <Button
                type="primary"
                onClick={this.handleRegister}
                className="register"
              >
                注册
              </Button>
            </Form.Item>
            <Form.Item {...this.tailFormItemLayout}>
              <Button type="primary" onClick={this.reset} className="reset">
                重置
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  /**
   * 注册成功通知提醒框
   */
  openNotificationWithIcon = (type, id) => {
    notification[type]({
      message: "注册成功，您已成为voteOnline的一员",
      description: `您是本网站的第${id}位用户`,
      style: {
        width: 400,
      },
    });
  };
  /**
   * 获取验证码
   */
  getMessage = async () => {
    const { phone } = await this.formRef.current.validateFields(["phone"]);

    this.setState({ loadingMessage: true });

    let { code, data } = await getMessage(phone);
    if (code === "000") {
      message.success({
        content: `${data.message}`,
        style: {
          marginLeft: "-65vw",
          marginTop: "4vh",
        },
      });
      this.setState({ count: this.state.count - 1 });
      //更新重新获取验证码时间
      const timer = setInterval(() => {
        this.setState({ count: this.state.count - 1 });
        if (this.state.count === 0) {
          this.setState({ count: 61 });
          clearInterval(timer);
          //loading状态结束
          this.setState({ loadingMessage: false });
        }
      }, 1000);
    } else {
      message.error({
        content: `${data.message}`,
        style: {
          marginLeft: "-65vw",
          marginTop: "4vh",
        },
      });
      this.setState({ loadingMessage: false });
    }
  };
  /**
   * 上传表单数据
   */
  handleRegister = async () => {
    let {
      userName,
      email,
      age,
      sex,
      phone,
      verifyMessage,
      password,
    } = await this.formRef.current.validateFields([
      "userName",
      "email",
      "age",
      "sex",
      "phone",
      "verifyMessage",
      "password",
    ]);
    let results = await register({
      userName,
      email,
      age,
      sex,
      phone,
      verifyMessage,
      password,
    });
    if (results.code === "000") {
      this.openNotificationWithIcon("success", results.data.id);
      //自动跳转至登录页面
      this.props.history.replace("/login");
    } else {
      message.error({
        content: `${results.data.message}`,
        style: {
          marginLeft: "-65vw",
          marginTop: "4vh",
        },
      });
    }
  };

  /**
   * 重置表单
   */
  reset = () => {
    const form = this.formRef.current;
    form.resetFields();
  };
}

export default Register;
