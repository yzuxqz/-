import React, {Component} from "react";
import {message, Pagination, Cascader, Input} from "antd";

import {voteCategory} from "../../config/voteCategory";
import "./index.less";
import {
    queryVoteThemes,
    queryVoteThemeCount,
} from "../../network/voteManagement/voteManagement";

import VoteListCard from "../../components/VoteListCard";

class UserVoteList extends Component {
    state = {
        page: 1,
        pageSize: 10,
        category: "",
        voteThemeList: [],
        total: 0,
        loading: false,
    };

    async componentDidMount() {
        this.updateVoteList();
    }

    render() {
        const {page, pageSize, voteThemeList, total, loading} = this.state;
        const userId = localStorage.getItem('userId');
        return (
            <div className="vote-list-wrapper">
                <div className="vote-list-header-tool-wrapper">
                    <div className="vote-list-search-wrapper">
                        <Input.Search
                            placeholder="input search text"
                            enterButton="Search"
                            size="normal"
                            loading={loading}
                        />
                    </div>
                    <div className="vote-list-cascader-wrapper">
                        <Cascader
                            options={voteCategory}
                            expandTrigger="hover"
                            // displayRender={displayRender}
                            onChange={this.changeCategory}
                        />
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    {voteThemeList.map((item) => {
                        let a = item["begin_date"].split("T")[0];
                        let b = item["begin_date"].split("T")[1].split(".")[0];
                        let begin = a + " " + b;
                        let c = item["finish_date"].split("T")[0];
                        let d = item["finish_date"].split("T")[1].split(".")[0];
                        let finish = c + " " + d;
                        let obj = {...item, begin_date: begin, finish_date: finish};
                        return (
                            <div key={item.id} style={{float: 'left', margin: '0.5%', width: '19%'}}>
                                <VoteListCard
                                    refresh={this.updateVoteList}
                                    {...obj}
                                    voteThemeData={item}
                                    userId={userId}
                                    key={item.id}
                                />
                            </div>
                        );
                    })}
                        </div>

                        <Pagination
                        className="vote-list-pagination"
                        total={total}
                        showSizeChanger
                        pageSizeOptions={[10, 20, 50]}
                        showTotal={(total) => `Total ${total} items`}
                        defaultPageSize={pageSize}
                        defaultCurrent={page}
                        onChange={this.paginationChange}
                        />
                        </div>
                        );
                    }
                    /**
                        * 页码或每页条数改变
                        */
                    paginationChange = (page, pageSize) => {
                    this.setState({page, pageSize}, () => {
                        this.updateVoteList();
                    });
                };
                    //分类筛选
                    changeCategory = (value, options) => {
                    this.setState({category: value.join("&")}, () => {
                        this.updateVoteList();
                    });
                };
                    //更新列表数据
                    updateVoteList = async () => {
                    const {page, pageSize, category} = this.state;
                    //当前页数据
                    let {code, data} = await queryVoteThemes(category, page, pageSize);
                    if (code === "000") {
                    message.success(`${data.message}`);
                    this.setState({voteThemeList: data.voteThemeList});
                } else {
                    message.error(`${data.message}`);
                }
                    //数据总数
                    let {data: d} = await queryVoteThemeCount(category);
                    this.setState({total: d.count});
                };
                    }

    export
    default
    UserVoteList;
