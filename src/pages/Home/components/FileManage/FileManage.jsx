import React, { Component } from 'react';
import { Breadcrumb, Button, Icon, Input, Radio, Table } from 'antd';

import { getIconByFileName } from '../../../../util/stringUtils';

const Search = Input.Search;

const data = [];
for (let i = 0; i < 31; i++) {
  data.push({
    key: i,
    fileName: '1.jpg',
    size: `${i + 20}MB`,
    updateTime: `2019-05-${i + 1}`,
  });
}

export default class FileManage extends Component {
  static displayName = 'FileManage';

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      vmode: 'list',
    };
  }

  componentDidMount() {
    console.log(this.props.match.params);
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  renderFileName = (val) => {
    return (
      <div>
        <Icon type={getIconByFileName(val)} theme="filled" style={{ color: 'green', marginRight: '8px', fontSize: '18px' }} />
        {val}
      </div>
    );
  };

  switchVmode = async () => {
    await this.setState({
      vmode: this.state.vmode === 'list' ? 'grid' : 'list',
    });
    const location = this.props.location;
    let search = location.search;
    if (!search) {
      search = `?vmode=${this.state.vmode}`;
    } else {
      search = location.search.replace(/vmode=[a-zA-Z]{4}/, `vmode=${this.state.vmode}`);
    }
    const newUrl = location.pathname + search;
    if (newUrl !== (location.pathname + location.search)) {
      this.props.history.push(newUrl);
    }
  };

  onRowClick = (record, e) => {
    e.preventDefault();
    this.setState({
      selectedRowKeys: [record.key],
    });
  };

  onRowDoubleClick = (record, e) => {
    e.preventDefault();
  };

  onRowContextMenu = (record, e) => {
    e.preventDefault();
  };

  onRowMouseEnter = (record, e) => {
    e.preventDefault();
  };

  onRowMouseLeave =(record, e) => {
    e.preventDefault();
  };

  render() {
    const { selectedRowKeys, vmode } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className="home">
        <div className="head">
          <div className="header-line">
            <div className="left-btn-group">
              <Button type="primary" icon="upload" style={{ marginRight: '10px' }}>上传</Button>
              <Button icon="folder-add" style={{ marginRight: '10px' }}>新建文件夹</Button>
              <Radio.Group>
                <Radio.Button>
                  <Icon type="download" />
                  <span>下载</span>
                </Radio.Button>
                <Radio.Button>
                  <Icon type="delete" />
                  <span>删除</span>
                </Radio.Button>
                <Radio.Button>
                  <Icon type="edit" />
                  <span>重命名</span>
                </Radio.Button>
                <Radio.Button>
                  <Icon type="copy" />
                  <span>复制到</span>
                </Radio.Button>
                <Radio.Button>
                  <Icon type="scissor" />
                  <span>移动到</span>
                </Radio.Button>
              </Radio.Group>
            </div>

            <div className="right-operate">
              <Search
                placeholder="搜索您的文件"
                onSearch={value => console.log(value)}
                style={{ width: 200, marginRight: '10px' }}
              />
              {
                  vmode === 'list' ? (
                    <Icon type="appstore" className="vmode" onClick={this.switchVmode} />
                  ) : (
                    <Icon type="bars" className="vmode" onClick={this.switchVmode} />
                  )
                }

            </div>
          </div>
        </div>

        <div className="list-content">
          <div className="breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>我的文件</Breadcrumb.Item>
              <Breadcrumb.Item href="">全部</Breadcrumb.Item>
              <Breadcrumb.Item>我的文档</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="table">
            {
                vmode === 'list' ? (
                  <Table rowSelection={rowSelection}
                    dataSource={data}
                    pagination={false}
                    onRow={(record) => {
                      return {
                        onClick: (e) => { this.onRowClick(record, e); }, // 点击行
                        onDoubleClick: (e) => { this.onRowDoubleClick(record, e); },
                        onContextMenu: (e) => { this.onRowContextMenu(record, e); },
                        onMouseEnter: (e) => { this.onRowMouseEnter(record, e); }, // 鼠标移入行
                        onMouseLeave: (e) => { this.onRowMouseLeave(record, e); },
                      };
                    }}
                  >
                    <Table.Column title="文件名" width={300} dataIndex="fileName" render={this.renderFileName} />
                    <Table.Column title="大小" width={100} dataIndex="size" />
                    <Table.Column title="修改日期" width={150} dataIndex="updateTime" />
                  </Table>
                ) : (
                  <div>
                    grid
                  </div>
                )
              }
          </div>
        </div>
      </div>
    );
  }
}
