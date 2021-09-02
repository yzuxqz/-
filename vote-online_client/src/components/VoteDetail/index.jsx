import React, {Component} from "react";
import {Card, message, List, Radio, Button, Modal, InputNumber, Progress} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import PubSub from 'pubsub-js';
import {getHasVoteNum, addIp, addNoIp} from '../../network/userVote/userVote';

class VoteDetail extends Component {
    gridStyle = {
        width: "45%",
        height: "100%",
        textAlign: "center",
    };
    state = {
        data: {},
        role: 1,
        hasVoteNum: -1,
        isModalVisible: false,
        percent: 0,
        ipLimit: false,
        everyday: false,
        disabled: false
    };

    async componentDidMount() {
        const role = localStorage.getItem('role');
        this.setState({role});
        PubSub.subscribe('sendResult', async () => {
            this.props.getChoose(this.state.data);
        });
        console.log(111,this.props.voteThemeData);
        const {everyday, ip_limit} = this.props.voteThemeData;
        const disabled = this.props.deadLine - new Date() <= 0;
        this.setState({ipLimit: ip_limit === 1, everyday: everyday === 1, disabled});
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const userId = localStorage.getItem('userId');
        const voteThemeId = this.props.voteThemeId & this.props.voteThemeId;
        //获取目前拥有票数
        let {code, data} = await getHasVoteNum(userId, voteThemeId);
        if (this.state.hasVoteNum === -1 || data.lastNum != prevState.hasVoteNum) {
            if (code === "000") {
                this.setState({...this.state, hasVoteNum: data.lastNum});
            }
        }
        return true;
    }

    render() {
        const options = this.props.data;
        console.log(options);
        const {data, role, hasVoteNum, isModalVisible, disabled, everyday} = this.state;

        return (
            <Card.Grid style={this.gridStyle}>
                <List
                    itemLayout="horizontal"
                    dataSource={options}
                    header={<div>
                        <span>投票选项</span>
                        <span>
                            剩余票数{hasVoteNum}
                            {everyday ? '每日0点刷新' : ''}
                        </span>
                    </div>
                    }
                    size="small"
                    split={true}
                    renderItem={(item) => (
                        <List.Item
                            extra={<img width={100} alt="logo" src={item.img!=='http://localhost:4200'?item.img:'//bpic.588ku.com/element_origin_min_pic/19/04/10/37e4fc917a27adbc791e30095893a2d1.jpg'}/>}
                        >
                            <Radio value={item.id} name={item.id} disabled={role == 1 || disabled}
                                   checked={data.id === item.id}
                                   onChange={() => {
                                       this.changeRadio(item.id);
                                   }}/>
                            <List.Item.Meta title={<div>{item.content}</div>}/>
                        </List.Item>
                    )}
                />
                <Modal title="你要投多少票？" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Progress type="circle" percent={this.state.percent}
                              format={percent => `${((percent / 100) * hasVoteNum).toFixed(0)}`}/>
                    <Button.Group>
                        <Button onClick={this.decline} icon={<MinusOutlined/>}/>
                        <Button onClick={this.increase} icon={<PlusOutlined/>}/>
                    </Button.Group>
                </Modal>
            </Card.Grid>
        );
    }

    changeRadio = (value) => {
        this.setState({
            ...this.state, data: {
                id: value
            }, isModalVisible: true
        });
    };
    increase = () => {
        const
            {
                hasVoteNum, percent
            }
                = this.state;
        let each = (1 / hasVoteNum) * 100;
        let p = percent + each;
        if (p > 100) {
            p = 100;
        }
        this.setState(
            {
                percent: p
            }
        );
    };

    decline = () => {
        const {hasVoteNum, percent} = this.state;
        let each = (1 / hasVoteNum) * 100;
        let p = percent - each;
        if (p < 0) {
            p = 0;
        }
        this.setState({percent: p});
    }
    ;
    handleOk = async () => {
        const {ipLimit, everyday, percent, hasVoteNum,data} = this.state;
        const {voteThemeId} = this.props;
        const {vote_num} = this.props.voteThemeData;
        const user_id = localStorage.getItem('userId');
        const vote_option_id = data.id
        let this_time_used_num = ((percent / 100) * hasVoteNum).toFixed(0);
        let last_num = hasVoteNum - this_time_used_num;
        console.log({user_id, vote_theme_id: voteThemeId, vote_num, last_num, this_time_used_num});
        if (hasVoteNum == 0) {
            if (everyday == 1) {
                message.warning(`今日票数已用完，请明日再来`);
            } else {
                message.warning(`该投票您已用完所有票数`);
            }
        } else {
            if (ipLimit) {
                let {code, data} = await addIp({
                    user_id,
                    vote_theme_id: voteThemeId,
                    vote_num,
                    last_num,
                    this_time_used_num,
                    vote_option_id,
                    questionnaire_theme_id: ''
                });
                if (code === '000') {
                    message.success(`${data.message}`);
                } else {
                    message.warning(`${data.message}`);
                }
            } else {
                let {code, data} = await addNoIp({
                    user_id,
                    vote_theme_id: voteThemeId,
                    vote_num,
                    last_num,
                    this_time_used_num,
                    vote_option_id,
                    questionnaire_theme_id: ''
                });
                if (code === '000') {
                    message.success(`${data.message}`);
                } else {
                    message.warning(`${data.message}`);
                }
            }
        }
        this.setState({isModalVisible: false});
    }
    ;
    handleCancel = () => {
        this.setState({isModalVisible: false});
    }
    ;
}

export default VoteDetail;
