import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store} from './selector';
import actions from "./action";
import {message, Form, Radio, Input, Select, Cascader, InputNumber, Button} from "antd";
import {checkData} from "../../utils/checkData";
import {changePersonalInfo} from "../../network/personalInfo/personalInfo";

class PersonalInfo extends Component {

    formRef=React.createRef()
    labelCol = {
        span: 4,
    };
    /**
     * 解决刷新后initValue为空
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        const form = this.formRef.current;
        const {phone, email, age, sex, userName} = this.props.main.user;
        form.setFieldsValue({
            'phone': phone,
            'email': email,
            'age': age,
            'sex': sex,
            'userName': userName
        });
    }


    render() {
        return (
            <div>
                <Form
                    ref={this.formRef}
                    name="personalInfo"
                    labelCol={this.labelCol}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    size="default"
                    initialValues={
                        this.props.main.user
                    }
                >
                    <Form.Item name="phone"
                               label="手机号"
                               rules={[
                                   {
                                       required: true,
                                       message: "手机号不能为空",
                                   },
                                   {
                                       pattern: new RegExp(
                                           /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                                       ),
                                       message: "该手机号无效",
                                   },
                               ]}
                               hasFeedback>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="email"
                               label="邮箱"
                               rules={[
                                   {
                                       type: "email",
                                       message: "邮箱格式错误",
                                   },
                                   {
                                       required: true,
                                       message: "邮箱不能为空",
                                   },
                               ]}
                               hasFeedback>
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item name="userName"
                               label="用户名"
                               rules={[
                                   {
                                       required: true,
                                       message: "用户名不能为空",
                                   },
                                   {
                                       validator: checkData,
                                   },
                                   {
                                       max: 20,
                                       message: "用户名不能超过20字节",
                                   },
                               ]}
                               hasFeedback>
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item name="age"
                               label="年龄"
                               rules={[
                                   {
                                       required: true,
                                       message: "年龄不能为空",
                                   },
                                   {
                                       type: "number",
                                       min: 1,
                                       message: "年龄不能小于1"
                                   }, {
                                       type: "number",
                                       max: 120,
                                       message: "年龄不能大于120"
                                   }
                               ]}
                               hasFeedback>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="sex" label="性别"
                               rules={[
                                   {
                                       required: true,
                                       message: "性别不能为空",
                                   },
                               ]}
                               hasFeedback>
                        <Select>
                            <Select.Option value="男">男</Select.Option>
                            <Select.Option value="女">女</Select.Option>
                        </Select>
                    </Form.Item>
                    {/*<Form.Item label="Cascader">*/}
                    {/*    <Cascader*/}
                    {/*        options={[*/}
                    {/*            {*/}
                    {/*                value: 'zhejiang',*/}
                    {/*                label: 'Zhejiang',*/}
                    {/*                children: [*/}
                    {/*                    {*/}
                    {/*                        value: 'hangzhou',*/}
                    {/*                        label: 'Hangzhou',*/}
                    {/*                    },*/}
                    {/*                ],*/}
                    {/*            },*/}
                    {/*        ]}*/}
                    {/*    />*/}
                    {/*</Form.Item>*/}
                    <Form.Item style={{display:'flex',justifyContent:'center'}}>
                        <Button onClick={this.submit}>提交</Button>
                    </Form.Item>
                    <Form.Item style={{display:'flex',justifyContent:'center'}}>
                        <Button onClick={this.reset}>重置</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    submit = async () => {
        const id = localStorage.getItem('userId');
        const data = await this.formRef.current.validateFields(['phone', 'email', 'userName', 'age', 'sex']);
        let {code, data: d} = await changePersonalInfo({...data, id});
        if (code === '000') {
            message.success(`${d.message}`);
        } else {
            message.error(`${d.message}`);
        }
    };
    reset = () => {
        this.formRef.current.resetFields();
    };
}

export default connect(store, actions)(PersonalInfo);