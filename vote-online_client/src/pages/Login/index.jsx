import React, {Component} from 'react';

import './index.less';
import loginImg from '../../assets/images/login-theme.png';

import LoginForm from "../../components/LoginForm";

class Login extends Component {
    render() {
        return (
            <div className="bgc-wrapper">
                {/*登录主题图片*/}
                <div className="left-img-wrapper">
                    <img src={loginImg} alt="login-img"/>
                </div>
                {/*登录表单容器*/}
                <div className="right-login-form-wrapper">
                    <LoginForm/>
                </div>
            </div>
        );
    }
}

export default Login;