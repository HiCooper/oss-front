import React, { Component } from 'react';
import { Button, Radio, Icon, Input, Breadcrumb, Table } from 'antd';
import './index.scss';
import { getIconByFileName } from '../../util/stringUtils';

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

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
    };
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  start = () => {
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };

  renderFileName = (val) => {
    return (
      <div>
        <Icon type={getIconByFileName(val)} theme="filled" style={{ color: 'green', marginRight: '8px', fontSize: '18px' }} />
        {val}
      </div>
    );
  };

  onSelectClick = (record, e) => {
    e.preventDefault();
    this.setState({
      selectedRowKeys: [record.key],
    });
    console.log('单击', record.key);
  };

  onDoubleClick = (record, e) => {
    e.preventDefault();
    console.log('双击', record.key);
  };

  onContextMenu = (record, e) => {
    e.preventDefault();
    console.log('右键', record.key);
  };

  onMouseEnter = (record, e) => {
    e.preventDefault();
    console.log('鼠标进入', record.key);
  };

  onMouseLeave =(record, e) => {
    e.preventDefault();
    console.log('鼠标离开', record.key);
  };

  render() {
    const { selectedRowKeys } = this.state;
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
              <Icon type="appstore" className="vmode" />
              {/* <Icon type="bars" className="vmode" /> */}
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
            <Table rowSelection={rowSelection}
              dataSource={data}
              pagination={false}
              scroll={{ y: '100%' }}
              onRow={(record) => {
                return {
                  onClick: (e) => { this.onSelectClick(record, e); }, // 点击行
                  onDoubleClick: (e) => { this.onDoubleClick(record, e); },
                  onContextMenu: (e) => { this.onContextMenu(record, e); },
                  onMouseEnter: (e) => { this.onMouseEnter(record, e); }, // 鼠标移入行
                  onMouseLeave: (e) => { this.onMouseLeave(record, e); },
                };
              }}
            >
              <Table.Column title="文件名" width={300} dataIndex="fileName" render={this.renderFileName} />
              <Table.Column title="大小" width={200} dataIndex="size" />
              <Table.Column title="修改日期" dataIndex="updateTime" />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
