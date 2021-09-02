// import React, { Component } from "react";
// import Pie from "../../components/Pie";
// import Line from "../../components/Line";
// import Bar from "../../components/Bar";
// import {
//   sortableContainer,
//   sortableElement,
//   sortableHandle,
// } from "react-sortable-hoc";
// import { queryAllVoteThemes } from "../../network/voteManagement/voteManagement";
// import { Collapse, message, Table } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import arrayMove from "array-move";
// const DragHandle = sortableHandle(() => (
//   <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
// ));
// const columns = [
//   {
//     title: "Sort",
//     dataIndex: "sort",
//     width: 30,
//     className: "drag-visible",
//     render: () => <DragHandle />,
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//     className: "drag-visible",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//   },
// ];
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     index: 0,
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     index: 1,
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     index: 2,
//   },
// ];
// const SortableItem = sortableElement((props) => <tr {...props} />);
// const SortableContainer = sortableContainer((props) => <tbody {...props} />);
// class VoteResult extends Component {
//   state = {
//     data: data,
//   };
//   componentDidMount() {
//     this.getData();
//   }

//   render() {
//     const { data } = this.state;
//     return (
//       <div>
//         <Table
//           pagination={false}
//           dataSource={data}
//           columns={columns}
//           rowKey={data.key}
//           components={{
//             body: {
//               wrapper: this.DraggableContainer,
//               row: this.DraggableBodyRow,
//             },
//           }}
//         />
//         {/* <Collapse accordion>
//           {data.map((item) => {
//             return <Collapse.Panel key={item.id} header={item.title}>
//               <Pie />
//               <line />
//               <Bar />
//             </Collapse.Panel>;
//           })}
//         </Collapse> */}
//       </div>
//     );
//   }
//   //获取投票主题数据
//   getData = async () => {
//     let { code, data } = await queryAllVoteThemes();
//     console.log(data);
//     if (code === "000") {
//       message.success(`${data.message}`);
//       this.setState({ data: data.voteThemeList });
//     } else {
//       message.error(`${data.message}`);
//     }
//   };

//   onSortEnd = ({ oldIndex, newIndex }) => {
//     const { data } = this.state;
//     if (oldIndex !== newIndex) {
//       const newData = arrayMove(
//         [].concat(data),
//         oldIndex,
//         newIndex
//       ).filter((el) => !!el);
//       console.log("Sorted items: ", newData);
//       this.setState({ data: newData });
//     }
//   };

//   DraggableContainer = (props) => (
//     <SortableContainer
//       useDragHandle
//       disableAutoscroll
//       helperClass="row-dragging"
//       onSortEnd={this.onSortEnd}
//       {...props}
//     />
//   );

//   DraggableBodyRow = ({ className, style, ...restProps }) => {
//     const { data } = this.state;
//     // function findIndex base on Table rowKey props and should always be a right array index
//     const index = data.findIndex(
//       (x) => x.index === restProps["data-row-key"]
//     );
//     return <SortableItem index={index} {...restProps} />;
//   };
// }

// export default VoteResult;
import React, { Component } from "react";
import { Table, message, Space, Drawer } from "antd";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { BgColorsOutlined, MenuOutlined } from "@ant-design/icons";
import { Route, Link } from "react-router-dom";
import arrayMove from "array-move";
import { queryAllVoteThemes } from "../../network/voteManagement/voteManagement";
import Pie from "../../components/Pie";
import Line from "../../components/Line";
import Bar from "../../components/Bar";
import './index.less';
const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

class SortableTable extends React.Component {
  state = {
    dataSource: [],
    visible: false,
  };
  columns = [
    {
      title: "排序",
      dataIndex: "sort",
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: "主题",
      dataIndex: "title",
      className: "drag-visible",
    },
    {
      title: "开始时间",
      dataIndex: "begin_date",
    },
    {
      title: "结束时间",
      dataIndex: "finish_date",
    },
    {
      title: "热度",
      dataIndex: "heat",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>{this.handleResult(record.id)}}>查看结果</a>
        </Space>
      ),
    },
  ];

  componentDidMount() {
    this.getData();
  }

  render() {
    const { dataSource, visible } = this.state;

    return (
      <div>
        <Table
          pagination={true}
          dataSource={dataSource}
          columns={this.columns}
          rowKey="index"
          components={{
            body: {
              wrapper: this.DraggableContainer,
              row: this.DraggableBodyRow,
            },
          }}
        />
        {/* <Drawer
          title="饼状图"
          placement="top"
          z-index="100"
          style={{width:"50vw"}}
          className="scroll"
          height="50vh"
          closable={false}
          destroyOnClose={true}
          mask={false}
          onClose={this.onClose}
          visible={visible}
        >

          <Pie/>
        </Drawer>
        <Drawer
          title="折线图"
          placement="right"
          z-index="100"
          width="50vw"
          height="100vh"
          mask={false}
          destroyOnClose={true}
          closable={false}
          onClose={this.onClose}
          visible={visible}
        ></Drawer>

        <Drawer
          title="Basic Drawer"
          placement="bottom"
          style={{width:"50vw"}}
          height="50vh"
          z-index="100"
          mask={false}
          destroyOnClose={true}
          closable={false}
          onClose={this.onClose}
          visible={visible}
        ></Drawer> */}
      </div>
    );
  }
  onClose = () => {
    // this.setState({ visible: false });
  };
  handleResult = (id) => {
      this.props.history.push('/home/resultDetail',{id})
    // this.setState({ visible: true });
  };
  //获取投票主题数据
  getData = async () => {
    let { code, data } = await queryAllVoteThemes();
    console.log(data);
    if (code === "000") {
      message.success(`${data.message}`);
      data.voteThemeList.forEach((item, index) => {
        item.index = index;
      });
      this.setState({ dataSource: data.voteThemeList });
    } else {
      message.error(`${data.message}`);
    }
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove(
        [].concat(dataSource),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      console.log("Sorted items: ", newData);
      this.setState({ dataSource: newData });
    }
  };

  DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  };
}

export default SortableTable;
