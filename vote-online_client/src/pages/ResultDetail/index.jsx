import React, { Component } from "react";

import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Pie from "../../components/Pie"
const { TabPane } = Tabs;

class ResultDetail extends React.Component {
  state={
    id:this.props.location.state.id
  }
  render() {
    const {id} = this.state
    return <Tabs defaultActiveKey="1">
      <TabPane
        tab={
          <span>
            <AppleOutlined />
            Tab 1
          </span>
        }
        key="1"
      >
        <Pie id={id}/>
      </TabPane>
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            Tab 2
          </span>
        }
        key="2"
      >
        Tab 2
      </TabPane>
    </Tabs>;
  }
}

export default ResultDetail;
