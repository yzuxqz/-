import React, {Component} from "react";
import {Card, message, Form, Input, Radio, Checkbox, Select, Button, List} from "antd";
import PubSub from 'pubsub-js'
class ExtraInfo extends Component {
    gridStyle = {
        width: "45%",
        height: "100%",
        textAlign: "center",
    };
    formRef = React.createRef();
    state = {
        init:[],
        role: 0,
        data:{}
    };

    componentDidMount() {
        const role = localStorage.getItem('role');
        PubSub.subscribe('sendResult',async ()=>{
            await this.submit()
            this.props.getInfo(this.state.data)
        })
        this.setState({...this.state,role,init:this.props.data});
    }

    render() {
        const {role} = this.state;
        return <Card.Grid style={this.gridStyle}>
            <div>信息采集</div>
            <Form ref={this.formRef}>
                {this.props.data.map((item) => {
                    const {
                        type,
                        label,
                        required,
                        name,
                        options,
                        value,
                    } = item;

                    switch (type) {
                        case "input":
                            return (
                                <Form.Item
                                    key={Math.random()}
                                    label={label}
                                    name={name}
                                    rules={[
                                        {
                                            required: required,
                                        },
                                    ]}
                                >
                                    <Input disabled={role == 1}/>
                                </Form.Item>
                            );
                        case "radio":
                            let radioArr = options.split("&");
                            return (
                                <Form.Item
                                    key={Math.random()}
                                    label={label}
                                    name={name}
                                    rules={[
                                        {
                                            required: required,
                                        },
                                    ]}
                                >
                                    <Radio.Group name={name} value={value}>
                                        {radioArr.map((item, index) => {
                                            return <Radio key={index} name={item} value={item}
                                                          disabled={role == 1}>{item}</Radio>;
                                        })}
                                    </Radio.Group>
                                </Form.Item>
                            );
                        case "checkbox":
                            let checkBoxArr = options.split("&");
                            return (
                                <Form.Item
                                    key={Math.random()}
                                    label={label}
                                    name={name}
                                    rules={[
                                        {
                                            required: required,
                                        },
                                    ]}
                                >
                                    <Checkbox.Group key={name}>
                                        {checkBoxArr.map((item) => {
                                            return <Checkbox key={item} value={item} disabled={role == 1}>{item}</Checkbox>;
                                        })}
                                    </Checkbox.Group>
                                </Form.Item>
                            );
                        case "select":
                            let selectArr = options.split("&");
                            return (
                                <Form.Item
                                    key={Math.random()}
                                    label={label}
                                    name={name}
                                    rules={[
                                        {
                                            required: required,
                                        },
                                    ]}
                                >
                                    <Select key={name} value={value} disabled={role == 1}>
                                        {selectArr.map((item) => {
                                            return (
                                                <Select.Option key={item} value={item}>{item}</Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            );
                        default:
                            return <></>;
                    }
                })}
            </Form>
        </Card.Grid>;
    }

    submit = async () => {
        const form = this.formRef.current;
        let nameArr = [];
        this.props.data.forEach(v => {
            nameArr.push(v.name);
        });
        let data = await form.validateFields(nameArr);
        let result=[]
        for (const resultKey in data) {
            result.push({id:this.props.data[resultKey-1].id,value:data[resultKey]})
        }
        this.setState({data:result})
    };
}

export default ExtraInfo;
