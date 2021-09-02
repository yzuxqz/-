import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import './App.less';

import Login from "./pages/Login";
import ForgetPwd from "./pages/ForgetPwd";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRouter from "./components/PrivateRouter";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/forgetPwd" component={ForgetPwd}/>
                    <Route path="/register" component={Register}/>
                    <PrivateRouter path="/home" component={Home}/>
                    <Redirect to="/login"/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;