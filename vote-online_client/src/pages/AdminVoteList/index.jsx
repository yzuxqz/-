import React, { Component } from "react";
import { Table, Tag, Space, message } from "antd";
import {
  queryAllVoteThemes,
  deleteVoteTheme,
} from "../../network/voteManagement/voteManagement";
class AdminVoteList extends Component {
  state = {
    voteThemeList: [],
  };
  componentDidMount() {
    this.getData();
  }
  columns = [
    {
      title: "所属分类",
      dataIndex: "category",
      key: "category",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "开始时间",
      dataIndex: "begin_date",
      key: "begin_date",
    },
    {
      title: "结束时间",
      dataIndex: "finish_date",
      key: "finish_date",
    },
    {
      title: "ip限制",
      dataIndex: "ip_limit",
      key: "ip_limit",
    },
    {
      title: "每日票数",
      dataIndex: "vote_num",
      key: "vote_num",
    },
    {
      title: "是否每日更新票数",
      dataIndex: "everyday",
      key: "everyday",
    },
    {
      title: "热度",
      dataIndex: "heat",
      key: "heat",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = status ? "green" : "red";
        let content = status ? "正在进行" : "已结束";
        return <Tag color={color}>{content}</Tag>;
      },
      filters: [
      {
        text: '正在进行',
        value: true,
      },
      {
        text: '已结束',
        value: false,
      }
    ],
    onFilter: (value, record) => record.status === value
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>{this.toDetail(text.id,text)}}>详情 {record.name}</a>
          <a
            onClick={() => {
              this.delete(text);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  render() {
    return (
      <Table columns={this.columns} dataSource={this.state.voteThemeList} />
    );
  }
  getData = async () => {
    let { code, data } = await queryAllVoteThemes();
    if (code === "000") {
      data.voteThemeList.forEach((item) => {
        if (Date.now() - new Date(item.finish_date) < 0) {
          item.status = true;
        } else {
          item.status = false;
        }
        console.log(Date.now() - new Date(item.finish_date));
        let arr = item.begin_date.split("T");
        item.begin_date = arr[0] + " " + arr[1].split(".")[0];
        let arr2 = item.finish_date.split("T");
        item.finish_date = arr2[0] + " " + arr2[1].split(".")[0];
      });

      this.setState({ voteThemeList: data.voteThemeList });
      message.success(`${data.message}`);
    } else {
      message.error(`${data.message}`);
    }
  };
  delete = async (row) => {
    let { code, data } = await deleteVoteTheme(row.id);
    if ((code = "000")) {
      this.getData();
    } else {
      message.error(`${data.message}`);
    }
  };
  toDetail=(id,text)=>{
    this.props.history.push('/home/voteAndExtraDetail',{id,voteThemeData:text})
  }
}

export default AdminVoteList;
