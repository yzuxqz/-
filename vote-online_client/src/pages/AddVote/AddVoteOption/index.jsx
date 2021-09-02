import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../selector";
import actions from "../action/vote-action";
import { Form, Input, Upload, Button, List, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ImgCrop from "antd-img-crop";
import "./index.less";
const noneImg = require('./img/none.png')
class AddVoteOption extends Component {
  fromRef = React.createRef();
  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 4,
    },
  };
  tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  state = {
    currentImgFile: {},
    options: [],
    isBtn: true, //是否显示上传图片按钮
  };

  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className="add-vote-option-wrapper">
        <div className="add-vote-option-list-wrapper">
          <List
            itemLayout="horizontal"
            dataSource={this.state.options}
            renderItem={(item) => (
              <List.Item
                extra={<img width={100} alt="logo" src={item.imgUrl?item.imgUrl:'//bpic.588ku.com/element_origin_min_pic/19/04/10/37e4fc917a27adbc791e30095893a2d1.jpg'} />}
              >
                <List.Item.Meta title={<div>{item.content}</div>} />
              </List.Item>
            )}
          />
        </div>
        <div className="add-vote-option-form-wrapper">
          <Form
            {...this.layout}
            name="basic"
            initialValues={{ remember: true }}
            ref={this.fromRef}
          >
            <Form.Item
              label="选项内容"
              name="content"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ width: "200px" }} />
            </Form.Item>
            <Form.Item label="选项图片" name="img">
              <ImgCrop rotate>
                <Upload
                  listType="picture-card"
                  customRequest={this.customRequest}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {this.state.isBtn ? uploadButton : null}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item {...this.tailLayout}>
              <Button type="primary" onClick={this.addVoteOption}>
                增加投票选项
              </Button>
            </Form.Item>
            <Form.Item {...this.tailLayout}>
              <Button onClick={this.submit}>保存</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  /**
   * 裁剪图片
   * @param file
   * @returns {Promise<void>}
   */
  handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  /**
   * 自定义upload上传行为
   */
  customRequest = (options) => {
    const { onSuccess, file} = options;
    //修改样式
    onSuccess();
    this.setState({ currentImgFile: file, isBtn: false },()=>{
      console.log(11111111111,this.state);
    });
  };
  /**
   * 增加投票选项至state
   */
  addVoteOption = async () => {
    const form = this.fromRef.current;
    const { content } = await form.validateFields(); //投票内容
    let flag=true

    this.state.options.forEach((v)=>{
      if(v.content===content) {
        flag=false
      }
    })
    if(flag){
      let imgUrl=null
      console.log(this.state.currentImgFile);
      if(this.state.currentImgFile.uid){
        imgUrl = await this.getBase64(this.state.currentImgFile); //将本地图片转为base64
      }
      let newOption = { content, img: this.state.currentImgFile, imgUrl }; //投票选项对象
      this.setState((preState) => {
        return { ...preState, options: [...preState.options, newOption] };
      },()=>{
        console.log(this.state);
      });
      form.resetFields()
      this.setState({isBtn:true,currentImgFile:{}})
    }else{
      message.warning('选项内容不能重复')
    }
  };
  handleChange=()=>{
    this.setState({isBtn:true})
  }
  /**
   * 转本地base64
   */
  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  submit = () => {
    //所有的投票选项添加至redux
    this.props.actions.addVoteOptionAction(this.state.options);
    console.log(this.props.main.voteReducer.voteOption.length);
    if (this.state.options.length <= 1) {
      message.warning("最少添加两个选项");
    } else {
      this.props.actions.changeIndex(2);
      //路由跳转
      this.props.history.replace("/home/addVote/addExtraInfo");
    }
  };
}

export default connect(store, actions)(AddVoteOption);
