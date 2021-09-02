import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {Steps} from "antd";
import {connect} from "react-redux";
import {store} from "./selector";
import actions from "./action/vote-action";

import "./index.less";
import AddVoteTheme from "./AddVoteTheme";
import AddVoteOption from "./AddVoteOption";
import AddExtraInfo from "./AddExtraInfo";
import FinishVoteCreate from "./FinishVoteCreate";

const {Step} = Steps;

class AddVote extends Component {
    render() {
        const {current} = this.props.main.voteReducer;
        return (
            <div>
                <Steps
                    type="navigation"
                    current={current}
                    className="site-navigation-steps"
                >
                    {current === 0 ? (
                        <Step status="process" title="编辑投票主题"/>
                    ) : (
                        <Step status="finish" title="编辑投票主题"/>
                    )}
                    {current === 1 ? (
                        <Step status="process" title="添加投票选项"/>
                    ) : current > 1 ? (
                        <Step status="finish" title="添加投票选项"/>
                    ) : (
                        <Step status="wait" title="添加投票选项"/>
                    )}
                    {current === 2 ? (
                        <Step status="process" title="投票信息采集"/>
                    ) : current > 2 ? (
                        <Step status="finish" title="投票信息采集"/>
                    ) : (
                        <Step status="wait" title="投票信息采集"/>
                    )}
                    {current === 3 ? (
                        <Step status="process" title="发布投票"/>
                    ) : current > 3 ? (
                        <Step status="finish" title="发布投票"/>
                    ) : (
                        <Step status="wait" title="发布投票"/>
                    )}
                </Steps>
                <div className="vote_content">
                    <Switch>
                        <Route path="/home/addVote/addVoteOption" component={AddVoteOption}/>
                        <Route path="/home/addVote/addExtraInfo" component={AddExtraInfo}/>
                        <Route
                            path="/home/addVote/finishVoteCreate"
                            component={FinishVoteCreate}
                        />
                        <Route path="/home/addVote/" component={AddVoteTheme}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default connect(store, actions)(AddVote);
