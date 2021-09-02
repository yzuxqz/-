import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    Card,
    Timeline,
    Tag,
    Tooltip,
    Statistic,
    Row,
    Col,
    Popconfirm,
    message,
} from "antd";
import {
    FireOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    HeartTwoTone
} from "@ant-design/icons";
import {Link, withRouter} from "react-router-dom";
import "./index.less";
import {deleteVoteTheme} from "../../network/voteManagement/voteManagement";
import {queryIsCollect, delCollect, addCollect, isCollect, changeAddCollect} from "../../network/userVote/userVote";

const {Countdown} = Statistic;

class VoteListCard extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        ip_limit: PropTypes.number.isRequired,
        vote_num: PropTypes.number.isRequired,
        everyday: PropTypes.number.isRequired,
        heat: PropTypes.number.isRequired,
        begin_date: PropTypes.string.isRequired,
        finish_date: PropTypes.string.isRequired,
    };
    state = {
        deadline:
            Date.now() + (new Date(this.props.finish_date).getTime() - Date.now()),
        isCollect: false

    };

    async componentDidMount() {
        //用户id,投票id
        let {code, data} = await queryIsCollect(Number(this.props.userId), this.props.id);
        if (code === '000') {
            if (data.isCollect && data.isCollect.exist === "1") {
                this.setState({isCollect: true});
            } else {
                this.setState({isCollect: false});
            }
        }
    }

    render() {
        const {
            id,
            title,
            ip_limit,
            vote_num,
            everyday,
            heat,
            begin_date,
            finish_date,
            userId
        } = this.props;

        const {deadline, isCollect} = this.state;
        return (
            <Card
                hoverable
                size="small"
                title={title}
                extra={
                    <div>
                        <a href="#" className="vote-card-header-tool" onClick={() => {
                            this.changeCollect(Number(userId), id);
                        }}>
                            {isCollect ? <HeartTwoTone twoToneColor="#eb2f96"/> :
                                <HeartTwoTone twoToneColor="#cccccc"/>}
                        </a>

                        <Tooltip
                            placement="top"
                            title={
                                <div>
                                    <div>ip限制:{ip_limit === 1 ? "是" : "否"}</div>
                                    <div>每日票数:{vote_num}</div>
                                    <div>每日刷新票数:{everyday === 1 ? "是" : "否"}</div>
                                </div>
                            }
                        >
                            <a href="#" className="vote-card-header-tool">
                                规则
                            </a>
                        </Tooltip>

                        <Link to={{pathname: "/home/voteAndExtraDetail", state: {id,voteThemeData:this.props.voteThemeData,deadline}}}
                              className="vote-card-header-tool">
                            详情
                        </Link>
                    </div>
                }
                style={{width: '100%', height: 230}}
            >
                <Timeline>
                    <Timeline.Item color="green">从: {begin_date}</Timeline.Item>
                    <Timeline.Item color="red">至: {finish_date}</Timeline.Item>
                </Timeline>
                <Row>
                    <Col span={12}>
                        <div style={{marginTop: "-30px"}}>
                            {new Date(this.props.finish_date).getTime() > Date.now() ? (
                                <Tag icon={<SyncOutlined spin/>} color="processing">
                                    进行中
                                </Tag>
                            ) : (
                                <Tag icon={<ClockCircleOutlined/>} color="default">
                                    已结束
                                </Tag>
                            )}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{marginTop: "-30px"}}>
                            <Statistic
                                value={heat}
                                valueStyle={{fontSize: "18px", color: "red"}}
                                prefix={<FireOutlined/>}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div
                        style={{width: "100%", marginTop: "10px", textAlign: "center"}}
                    >
                        <Countdown
                            title="剩余时间"
                            value={deadline}
                            valueStyle={{fontSize: "14px"}}
                            format={
                                new Date(this.props.finish_date).getTime() > Date.now()
                                    ? "D 天 H 时 m 分 s 秒"
                                    : ""
                            }
                        />
                    </div>
                </Row>
            </Card>
        );
    }

    handleDelete = async (id) => {
        console.log(id);
        let {code, data} = await deleteVoteTheme(id);
        if (code === "000") {
            message.success(`${data.message}`);
        } else {
            message.error(`${data.message}`);
        }
        ///让父组件重新获取数据
        this.props.refresh();
    };
    changeCollect = async (userId, id) => {
        let {code: c, data: d} = await isCollect(userId, id);
        if (c === '000' && d.result[0]) {//已经存在收藏表
            if (this.state.isCollect) {//exist为1，则取消收藏
                let {code, data} = await delCollect(userId, id);
                if (code === '000') {
                    message.success(`${data.message}`);
                    this.setState({isCollect: false});
                }
            } else {//exist为0，收藏
                let {code, data} = await changeAddCollect(userId, id);
                if (code === '000') {
                    message.success(`${data.message}`);
                    this.setState({isCollect: true});
                }
            }

        } else {//如果没有，新增收藏表
            let {code, data} = await addCollect(userId, id);
            if (code === '000') {
                message.success(`${data.message}`);
                this.setState({isCollect: true});
            }
        }
    };
}

export default withRouter(VoteListCard);
