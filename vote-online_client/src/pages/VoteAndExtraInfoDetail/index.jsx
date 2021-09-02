import React, { Component } from "react";
import VoteDetail from "../../components/VoteDetail";
import ExtraInfo from "../../components/ExtraInfo";
import { message,Button } from "antd";
import PubSub from 'pubsub-js'
import {
  queryVoteExtraInfo,
  queryVoteOptions,
} from "../../network/voteManagement/voteManagement";
class VoteAndExtraInfoDetail extends Component {
  state = {
    options: [],//选项信息
    extraInfo: [], //采集信息表
    optionChoose:{}, //选择结果
    extraInfoResult:{} ,//采集结果
    role:0,
    voteThemeId:0
  };
  async componentDidMount() {
    const { id } = this.props.location.state;
    this.setState({...this.state,voteThemeId:id})
    let { code, data } = await queryVoteOptions(id);
    let { code: code2, data: data2 } = await queryVoteExtraInfo(id);
    if ((code = "000") && (code2 = "000")) {
      message.success(`${data.message}`);
      message.success(`${data2.message}`);
      this.setState({ options: data.options, extraInfo: data2.voteExtraInfo });
    } else {
      message.error(`${data.message}`);
    }
    const role = localStorage.getItem('role')
    this.setState({...this.state,role})
  }
  render() {
    const { options, extraInfo,role,voteThemeId } = this.state;

    return (
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        <VoteDetail data={options} getChoose={this.getChoose} voteThemeId={voteThemeId} voteThemeData={this.props.location.state.voteThemeData} deadLine={this.props.location.state.deadline}/>
        <ExtraInfo data={extraInfo} getInfo={this.getInfo}/>
        {
         role==0?<Button onClick={this.submit}>提交</Button>:<></>
        }
      </div>
    );
  }
  getChoose=(data)=>{
    console.log(data);
  }
  getInfo=(data)=>{
    console.log(data);
  }
  submit=()=>{
    PubSub.publish('sendResult')
  }
}


export default VoteAndExtraInfoDetail;
