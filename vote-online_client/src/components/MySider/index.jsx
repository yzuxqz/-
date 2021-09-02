import React, {Component, createElement} from 'react';
import * as Icon from '@ant-design/icons';
import {Layout, Menu, Switch} from "antd";
import {Link} from 'react-router-dom'
import './index.less'

const {SubMenu} = Menu
const {Sider} = Layout;

class MySider extends Component {
    state = {
        theme: true,
        role: "",
    }
    getMenuList = (menuList) => {
        return menuList.map(item => {
            //antd4中动态创建icon
            const icon = createElement(
                Icon[item.icon],
                {
                    style: {fontSize: '16px'}
                }
            )
            if (item.children === undefined) {

                return (
                    <Menu.Item key={item.title} icon={icon}>
                        <Link to={item.to}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.title} icon={icon} title={item.title}>
                        {this.getMenuList(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    changeTheme = () => {
        this.setState((preState, props) => ({theme: !preState.theme}))
    }

    componentWillMount() {
        this.menuList = this.getMenuList(this.props.menuList)
        this.setState({ role: localStorage.getItem("role") });
    }

    render() {
        const {theme,role} = this.state
        console.log(111111,this.props.userName);
        return (

            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                // onBreakpoint={broken => {
                //     console.log(broken);
                // }}
                // onCollapse={(collapsed, type) => {
                //     console.log(collapsed, type);
                // }}
                style={theme ? {backgroundColor: "#001529"} : {backgroundColor: "#ffffff"}}
            >
                <div className="logo" style={theme ? {color: "#ffffff"} : {color: "black"}}>{role==0?`欢迎 ${this.props.userName}`:`${this.props.sliderTitle}`}</div>
                <div style={{display:"flex",justifyContent:'center'}}>
                    <Switch
                        checked={this.state.theme}
                        onChange={this.changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        className="switchTheme"
                    />
                </div>

                <Menu theme={theme ? 'dark' : 'Light'} mode="inline" defaultSelectedKeys={['4']}>
                    {this.menuList}
                </Menu>
            </Sider>
        );
    }
}

export default MySider;