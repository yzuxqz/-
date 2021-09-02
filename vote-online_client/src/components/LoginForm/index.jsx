import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Form, Input, Button, message, Select} from "antd";
import {
    UserOutlined,
    LockOutlined,
} from "@ant-design/icons";

import "./index.less";

import {checkData} from "../../utils/checkData";
import {getMessage, fastLoginIn, pwdLoginIn, isLogin} from "../../network/login/login";

class LoginForm extends Component {

    formRef = React.createRef(); //验证码表单引用
    formPwdRef = React.createRef(); //账号密码表单引用
    layout = {
        wrapperCol: {offset: 3, span: 18},
    };
    tailLayout = {
        wrapperCol: {offset: 3, span: 18},
    };

    state = {
        loginMethod: 1, //记录登录方式
        loadingMessage: false, //记录获取验证码状态
        count: 61, //记录重新获取验证码的时间
    };

    render() {
        const {loginMethod, loadingMessage, count} = this.state;
        return (
            <div className="login-form">
                {/*登录头部*/}
                <div className="login-method">
                    <div
                        className={
                            loginMethod === 1 ? "slider slider-fast" : "slider slider-pwd"
                        }
                    />
                    <span
                        onClick={this.handleFastLogin}
                        style={loginMethod === 1 ? {color: "#000"} : {}}
                    >
            快捷登录
          </span>
                    <span
                        onClick={this.handlePwdLogin}
                        style={loginMethod === 2 ? {color: "#000"} : {}}
                    >
            密码登录
          </span>
                </div>
                {/*表单主体*/}
                <div className="login-content-wrapper">
                    {loginMethod === 1 ? (
                        // 快速登录
                        <Form
                            {...this.layout}
                            ref={this.formRef}
                            name="fast-login"
                            onFinish={this.handleFinish}
                        >
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        pattern: new RegExp(
                                            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                                        ),
                                        message: "该手机号无效",
                                    },
                                    {
                                        required: true,
                                        message: "手机号不能为空",
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore="+86"
                                    placeholder="请输入手机号"
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item
                                name="verifyMessage"
                                rules={[
                                    {
                                        min: 6,
                                        max: 6,
                                        message: "有效验证码为6位数",
                                    },
                                    {
                                        required: true,
                                        message: "验证码不能为空",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="请输入验证码"
                                    style={{padding: "0px", paddingLeft: "1vw"}}
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
                            <Form.Item {...this.tailLayout}>
                                <Button
                                    type="primary"
                                    onClick={this.handleSubmit}
                                    className="fast-login-btn"
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        //密码登录
                        <Form
                            {...this.layout}
                            ref={this.formPwdRef}
                            name="pwd-login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.handleFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "手机号/用户名不能为空",
                                    },
                                    {
                                        validator: checkData,
                                    },
                                    {
                                        max: 20,
                                        message: "用户名不能超过20字节",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    placeholder="请输入手机号/用户名"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "密码不能为空",
                                    },
                                    {
                                        message: "密码不能超过20字节（汉字为3字节）",
                                        max: 20,
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择身份",
                                    },
                                ]}
                            >
                                <Select placeholder="请选择身份" allowClear>
                                    <Select.Option value="0">普通用户</Select.Option>
                                    <Select.Option value="1">管理员</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...this.tailLayout}>
                                <Button
                                    type="primary"
                                    onClick={this.handlePwdSubmit}
                                    className="pwd-login-btn"
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                    {/* 登录底部 */}
                    <div className="footer-wrapper">
                        <div>
                            <div className="register">
                                没有账号？
                                <Button type="link" onClick={this.toRegister}>
                                    立即注册
                                </Button>
                            </div>
                            <div className="forget-pwd-wrapper">
                                <Button
                                    type="link"
                                    className="forget-pwd"
                                    onClick={this.toForgetPwd}
                                >
                                    忘记密码
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 修改为快捷登录状态
     */
    handleFastLogin = () => {
        this.setState({loginMethod: 1});
    };
    /**
     * 修改为密码登录状态
     */
    handlePwdLogin = () => {
        this.setState({loginMethod: 2});
    };
    /**
     * 获取验证码
     */
    getMessage = async () => {
        const {phone} = await this.formRef.current.validateFields(["phone"]);
        //loading状态开启
        this.setState({loadingMessage: true});
        const {code, data} = await getMessage(phone);
        if (code === "000") {
            message.success(`${data.message}`);
            this.setState({count: this.state.count - 1});
            //更新重新获取验证码时间
            const timer = setInterval(() => {
                this.setState({count: this.state.count - 1});
                if (this.state.count === 0) {
                    this.setState({count: 61});
                    clearInterval(timer);
                    //loading状态结束
                    this.setState({loadingMessage: false});
                }
            }, 1000);
        } else {
            message.error(`${data.message}`);
            //loading状态结束
            this.setState({loadingMessage: false});
        }
    };

    /**
     * 提交验证码登录表单
     */
    handleSubmit = async () => {
        const form = this.formRef.current;
        let {phone, verifyMessage} = await form.validateFields([
            "phone",
            "verifyMessage",
        ]);
        let {code, data} = await fastLoginIn(phone, verifyMessage);
        let res = await isLogin();
        if (code === "000") {
            localStorage.setItem("role", "0");
            localStorage.setItem("userId", res.data.user.id);
            //普通用户
            this.props.history.replace("/home/userHome");
            message.success(`${data.message}`);
        } else {
            message.error(`${data.message}`);
        }
    };
    /**
     * 提交密码登录表单
     */
    handlePwdSubmit = async () => {
        const form = this.formPwdRef.current;
        let {username, password, role} = await form.validateFields([
            "username",
            "password",
            "role",
        ]);
        let {code, data} = await pwdLoginIn(username, password, role);
        if (code === "000") {
            message.success(`${data.message}`);
            if (role === "0") {
                localStorage.setItem("role", role);
                localStorage.setItem("userId", data.user.id);
                //普通用户
                this.props.history.replace("/home/userHome");
            } else {
                localStorage.setItem("role", role);
                //管理员
                this.props.history.replace("/home/adminHome");
            }
        } else {
            message.error(`${data.message}`);
        }
    };
    /**
     * 注册
     */
    toRegister = () => {
        this.props.history.push("/register");
    };
    /**
     * 忘记密码
     */
    toForgetPwd = () => {
        this.props.history.push("/forgetPwd");
    };
}

export default withRouter(LoginForm);
