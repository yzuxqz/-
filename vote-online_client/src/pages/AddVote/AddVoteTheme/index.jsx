import React, { Component } from "react";
import {
  Form,
  Cascader,
  Input,
  DatePicker,
  Switch,
  InputNumber,
  Button,
} from "antd";
import { connect } from "react-redux";
import { store } from "../selector";
import actions from "../action/vote-action";
import { voteCategory } from "../../../config/voteCategory";
import "./index.less";

import { formatDate } from "../../../utils/formatDate";
class AddVoteTheme extends Component {
  formRef = React.createRef();
  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  render() {
    return (
      <div>
        <Form {...this.layout} layout="horizontal" ref={this.formRef}>
          <Form.Item
            name="category"
            label="分类"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Cascader options={voteCategory} />
          </Form.Item>
          <Form.Item
            name="title"
            label="主题"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="begin_time_finish_time"
            label="投票时间段"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker.RangePicker showTime />
          </Form.Item>
          <Form.Item
            name="limit"
            label="ip限制"
            initialValue={true}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
            />
          </Form.Item>
          <Form.Item
            name="vote_num"
            label="每人票数"
            initialValue={3}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} max={10} defaultValue={3} />
          </Form.Item>
          <Form.Item
            name="everyday"
            label="是否更新每日票数"
            initialValue={true}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              defaultChecked
            />
          </Form.Item>
          <Form.Item {...this.tailLayout}>
            <Button onClick={this.submit}>保存</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
  submit = async () => {
    const form = this.formRef.current;
    const voteThemeData = await form.validateFields();
    let themeData = {};
    themeData.begin_date = formatDate(
      JSON.stringify(voteThemeData["begin_time_finish_time"][0]._d)
    );
    themeData.finish_date = formatDate(
      JSON.stringify(voteThemeData["begin_time_finish_time"][1]._d)
    );
    themeData.category = voteThemeData["category"].join("&");
    themeData.everyday = voteThemeData["everyday"] ? 1 : 0;
    themeData.ip_limit = voteThemeData["limit"] ? 1 : 0;
    themeData.title = voteThemeData["title"];
    themeData.vote_num = voteThemeData["vote_num"];
    //保存至redux中
    this.props.actions.addVoteThemeAction(themeData);
    //修改current,从而改变样式
    this.props.actions.changeIndex(1);
    //增加选项
    this.props.history.replace("/home/addVote/addVoteOption");
  };
}

export default connect(store, actions)(AddVoteTheme);
