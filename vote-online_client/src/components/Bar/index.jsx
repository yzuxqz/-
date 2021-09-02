import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Collapse} from 'antd';
class Bar extends Component {
    getOption =()=> {
        let option = {
          title:{
            text:'用户骑行订单',
            x:'center'
          },
          tooltip:{
            trigger:'axis',
          },
          xAxis:{
            data:['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              name:'OFO订单量',
              type:'line',   //这块要定义type类型，柱形图是bar,饼图是
              data:[1000,2000,1500,3000,2000,1200,800]
            }
          ]
        }
       return option
      }
    
    render() {
        return (
            <div>
               <ReactEcharts option={this.getOption()} style={{height:'400px'}}/>
            </div>
        );
    }
}

export default Bar;