import React, {Component} from 'react';
import {Button} from 'antd';
import {connect} from 'react-redux';
import {store} from '../selector';
import actions from '../action/vote-action';

class FinishVoteCreate extends Component {
    render() {
        return (
            <div>
                <Button onClick={this.submit}>
                    发布投票
                </Button>

            </div>
        );
    }

    submit=()=>{
        this.props.actions.submitVoteAction()
        this.props.history.replace('/home/addVote/')
    }
}

export default connect(store,actions)(FinishVoteCreate);