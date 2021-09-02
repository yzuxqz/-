import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Divider, Input, Form, Button, message } from "antd";

import "./index.less";
import { getMessage, forgetPwd } from "../../network/login/login";

class ForgetPwd extends Component {
  state = {
    loadingMessage: false, //loading状态
    count: 61, //再次发送验证码倒计时
  };
  layout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
  formRef = React.createRef();

  render() {
    const { loadingMessage, count } = this.state;
    return (
      <Row justify="center" align="middle" className="forgetPwd-form-wrapper">
        <Col offset={8} span={6} className="forgetPwd-form">
          <Divider>重置密码</Divider>
          <Form ref={this.formRef} {...this.layout} name="forgetForm">
            <Form.Item
              name={"phone"}
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
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="verifyMessage"
              rules={[
                {
                  required: true,
                  message: "验证码不能为空",
                },
                {
                  min: 6,
                  max: 6,
                  message: "验证码必须为6位",
                },
              ]}
            >
              <Input
                placeholder="请输入验证码"
                style={{ padding: "0px", paddingLeft: "1vw" }}
                suffix={
                  <Button
                    type="primary"
                    onClick={this.getMessage}
                    loading={loadingMessage}
                  >
                    {count === 61 ? "获取验证码" : `${count}s后重新获取`}
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "新密码不能为空",
                },
                {
                  max: 20,
                  message: "密码不能超过20字节",
                },
              ]}
            >
              <Input placeholder="请输入新密码" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...this.layout.wrapperCol }}>
              <Button
                type="primary"
                onClick={this.handleForgetPwd}
                style={{ width: "100%" }}
              >
                重置密码
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 8 }}>
              <Button type="link" onClick={this.toLoginIn}>
                {"< 返回登录"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8} />
      </Row>
    );
  }
  /**
   * 获取验证码
   */
  getMessage = async () => {
    const { phone } = await this.formRef.current.validateFields(["phone"]);
    //loading状态开启
    this.setState({ loadingMessage: true });
    const { code, data } = await getMessage(phone);
    if (code === "000") {
      message.success(`${data.message}`);
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
      message.error(`${data.message}`);
      //loading状态结束
      this.setState({ loadingMessage: false });
    }
  };

  /**
   * 提交重置密码表单
   */
  handleForgetPwd = async () => {
    const form = this.formRef.current;
    const { phone, verifyMessage, password } = await form.validateFields([
      "phone",
      "verifyMessage",
      "password",
    ]);
    const { code, data } = await forgetPwd(phone, verifyMessage, password);
    if (code === "000") {
      message.success(`${data.message}`);
    } else {
      message.error(`${data.message}`);
    }
  };

  /**
   * 返回登录
   */
  toLoginIn = () => {
    this.props.history.replace("/login");
  };
}

export default withRouter(ForgetPwd);
