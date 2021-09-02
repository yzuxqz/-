import React, {useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import {message} from "antd";
import {connect} from "react-redux";

import actions from "./action";
import {store} from "./selector";

import {isLogin} from "../../network/login/login";

const PrivateRouter = ({component, path, actions, main}) => {
    useEffect(() => {
        getUser().then().catch()
    }, []);
    return (
        <div>
            <Route path={path} component={component}/>
        </div>
    );
    {/* 有问题 */}
    {/*{true ? (*/}
    {/*    <Route path={path} component={component}/>*/}
    {/*) : (*/}
    {/*    <Redirect to={{pathname: "/login"}}/>*/}

    /**
     * 从session中获取用户信息并存入redux
     * @returns {Promise<void>}
     */
    async function getUser() {
        const {code, data} = await isLogin();
        if (code === "000") {
            message.success(`${data.message}`);
            actions.init(data.user);
        } else {
            message.error(`${data.message}`);
        }
    }

};

export default connect(store, actions)(PrivateRouter);
