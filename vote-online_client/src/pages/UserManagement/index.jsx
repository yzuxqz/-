import React, { Component } from "react";
import { Table, Tag, Space, message, Button } from "antd";
import {
  getUsers,
  deleteUser,
  deleteUsers,
  restoreUser,
} from "../../network/userManagement/userManagement";

class UserManagement extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 10,
    count: 0, //总条数
    hasSelected: false, //多选框是否选中
    selectRows: [], //选中的行数据
    loading: false, //点击删除按钮是否loading
    paginationProps: {}, //分页设置（因为total获取不到，放在state中）
  };
  //列设置
  columns = [
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      sorter: { compare: (a, b) => a.age - b.age },
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ip",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "状态",
      dataIndex: "exist",
      key: "exist",
      render: (exist) => (
        <>
          {exist === "1" ? (
            <Tag color="green">正常</Tag>
          ) : (
            <Tag color="volcano">已删除</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "正常",
          value: "1",
        },
        {
          text: "已删除",
          value: "0",
        },
      ],
      onFilter: (value, record) => record.exist === value,
    },
    {
      title: "操作",
      key: "action",
      render: (row) => (
        <Space size="middle">
          {row.exist === "1" ? (
            <Button
              type="primary"
              danger
              size="small"
              style={{ fontSize: "12px" }}
              shape="round"
              onClick={this.deleteUser(row)}
            >
              删除
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              style={{ fontSize: "12px" }}
              shape="round"
              onClick={this.restoreUser(row)}
            >
              恢复
            </Button>
          )}
        </Space>
      ),
    },
  ];
  //选中行
  rowSelection = {
    onChange: async (selectedRowKeys, selectedRows) => {
      //修改删除按钮显示状态
      if (selectedRows.length === 0) {
        this.setState({ hasSelected: false });
      } else {
        this.setState({ hasSelected: true, selectedRows });
      }
    },
  };
  async componentDidMount() {
    //分页获取用户列表和用户总数
    await this.getUsers();
    //在获取到total后进行分页设置
    const paginationProps = {
      total: this.state.count,
      showSizeChanger: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      showTotal: () => `共${this.state.count}条`,
      defaultPageSize: this.state.pageSize,
      defaultCurrent: this.state.currentPage,
      //改变每页条数后重新获取用户
      onShowSizeChange: (currentPage, pageSize) => {
        this.setState({ currentPage, pageSize }, async () => {
          await this.getUsers();
        });
      },
      //改变页码后重新获取用户
      onChange: (currentPage, pageSize) => {
        this.setState({ currentPage, pageSize }, async () => {
          await this.getUsers();
        });
      },
    };
    //更新分页状态
    this.setState({ paginationProps });
  }
  render() {
    const { users, paginationProps, hasSelected, loading } = this.state;
    return (
      <div>
        <Button
          type="primary"
          onClick={this.deleteUsers}
          disabled={!hasSelected}
          loading={loading}
          style={{ marginBottom: "20px" }}
        >
          全部删除
        </Button>
        <Table
          rowSelection={{
            ...this.rowSelection,
          }}
          rowKey={(record) => record.id}
          columns={this.columns}
          dataSource={users}
          pagination={paginationProps}
        />
      </div>
    );
  }
  /**
   * 删除单个用户
   */
  deleteUser = (row) => {
    return async () => {
      const { id } = row;
      try {
        const { code, data } = await deleteUser(id);
        if (code === "000") {
          message.success(`${data.message}`);
          //删除后更新数据
          await this.getUsers();
        } else {
          message.error(`${data.message}`);
        }
      } catch (err) {
        console.log(err);
      }
    };
  };
  /**
   * 批量删除用户
   */
  deleteUsers = async () => {
    this.setState({ loading: true });
    //批量删除
    let ids = [];
    this.state.selectedRows.forEach((item) => {
      ids.push(item.id);
    });

    const { code, data } = await deleteUsers(ids);
    if (code === "000") {
      message.success(`${data.message}`);
      //删除后更新数据
      await this.getUsers();
    } else {
      message.error(`${data.message}`);
    }

    this.setState({ loading: false });
  };
  /**
   * 恢复用户
   */
  restoreUser = (row) => {
    return async () => {
      const { id } = row;
      const { code, data } = await restoreUser(id);
      if (code === "000") {
        message.success(`${data.message}`);
        //恢复后更新数据
        await this.getUsers();
      } else {
        message.error(`${data.message}`);
      }
    };
  };
  /**
   * 分页请求用户列表
   */
  getUsers = async () => {
    const { currentPage, pageSize } = this.state;

    const { code, data } = await getUsers(currentPage, pageSize);
    if (code === "000") {
      this.setState({ users: data.users, count: data.count });
      console.log(this.state.count);
      message.success(`${data.message}`);
    } else {
      message.error(`${data.message}`);
    }
  };
}

export default UserManagement;
