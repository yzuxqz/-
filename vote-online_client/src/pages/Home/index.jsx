import React, { Component } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import {connect} from 'react-redux'
import "./index.less";
import { adminMenuList, userMenuList } from "../../config/MenuConfig";

import MySider from "../../components/MySider";
import AdminHome from "../AdminHome";
import UserManagement from "../UserManagement";
import AddVote from "../AddVote";
import UserVoteList from "../UserVoteList";
import UserHome from "../UserHome";
import PersonalInfo from "../PersonalInfo";
import AdminVoteList from "../AdminVoteList";
import VoteResult from "../VoteResult";
import ResultDetail from "../ResultDetail";
import voteAndExtraDetail from "../VoteAndExtraInfoDetail";
import userInfoReducer from "../../components/PrivateRouter/reducer/user-info-rerducer";
const { Header, Content, Footer } = Layout;

class Home extends Component {
  state = {
    role: "",
  };
  componentWillMount() {
    this.setState({ role: localStorage.getItem("role") });
  }

  render() {
    const { role } = this.state;
    return (
      <Layout className="management-wrapper">
        {/* 根据用户渲染菜单权限 */}
        {role === "0" ? (
          <MySider userName={this.props.main.user.userName} menuList={userMenuList} sliderTitle="voteOnline 用户端" />
        ) : (
          <MySider menuList={adminMenuList} sliderTitle="voteOnline 管理端" />
        )}

        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content style={{ position: "relative", margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360, overflow: "auto" }}
            >
              {role === "0" ? (
                <Switch>
                  <Route path="/home/userHome" component={UserHome} />
                  <Route path="/home/personalInfo" component={PersonalInfo} />
                  <Route path="/home/userVoteList" component={UserVoteList} />
                  <Route
                    path="/home/voteAndExtraDetail"
                    component={voteAndExtraDetail}
                  />
                  <Route path="/home/VoteResult" component={VoteResult} />
                  <Route path="/home/resultDetail" component={ResultDetail} />
                  <Redirect to="/login" />
                </Switch>
              ) : (
                <Switch>
                  <Route path="/home/adminHome" component={AdminHome} />
                  <Route
                    path="/home/userManagement"
                    component={UserManagement}
                  />
                  <Route path="/home/adminVoteList" component={AdminVoteList} />
                  <Route
                    path="/home/voteAndExtraDetail"
                    component={voteAndExtraDetail}
                  />
                  <Route path="/home/addVote" component={AddVote} />
                  <Route path="/home/VoteResult" component={VoteResult} />
                  <Route path="/home/resultDetail" component={ResultDetail} />
                  <Redirect to="/login" />
                </Switch>
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Vote Online ©2021 Created by Yzu Xqz
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(state=>({
  main:state.userInfoReducer
}))(Home);
