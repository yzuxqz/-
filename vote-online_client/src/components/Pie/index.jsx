import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import {queryVoteOptions} from '../../network/voteManagement/voteManagement'
import { message,Switch } from "antd";
class Pie extends Component {
    state={
        data:[],
        theme:false
    }
    componentDidMount(){
        this.getData()
    }
  getOption = () => {
      let dataArr = []
      console.log(this.state.data);
      this.state.data.forEach(v=>{
          dataArr.push({value:v.all_count,name:`${v.content}(${v.all_count}票)`})
      })
      console.log(dataArr);
    let option = {
      legend: {
        top: "top",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "面积模式",
          type: "pie",
          radius: [40, 180],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: dataArr
        },
      ],
    };
    return option;
  };

  render() {
      const {theme}= this.state
    return (
      <div>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
          <Switch defaultChecked onChange={this.changeTheme} style={{marginBottom:"15px"}}/>
          </div>

        <ReactEcharts theme={theme?"dark":'light'} option={this.getOption()} style={{ height: "65vh" }} />
      </div>
    );
  }
  getData=async()=>{
    console.log(this.props.id);
      let {code,data}=await queryVoteOptions(this.props.id)
        if(code==='000'){
            this.setState({data:data.options})
            message.success(`${data.message}`)
            console.log(data);
        }else{
            message.error(`${data.error}`)
        }
  }
  changeTheme=()=>{
      this.setState({theme:!this.state.theme})
  }
}

export default Pie;
