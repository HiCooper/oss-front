import React, { Component } from 'react';
import { Breadcrumb, Button, Dropdown, Icon, Input, Menu, Table } from 'antd';
import { getIconByFileName } from '../../util/stringUtils';
import './index.scss';

const Search = Input.Search;

const data = [];
for (let i = 0; i < 50; i++) {
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

  handleMenuClick = (e) => {
    console.log('click', e);
  };

  menu = () => (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">
      下载
      </Menu.Item>
      <Menu.Item key="2">
      删除
      </Menu.Item>
    </Menu>
  );

  moreMenu = () => (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">
        设置读写权限
      </Menu.Item>
      <Menu.Item key="2">
        下载
      </Menu.Item>
      <Menu.Item key="3">
        复制文件URL
      </Menu.Item>
      <Menu.Item key="4">
        删除
      </Menu.Item>
    </Menu>
  );

  renderOperate = () => {
    return (
      <div>
        <Button type="link" size="small">详情</Button>
        <Dropdown overlay={this.moreMenu} size="small">
          <Button type="link" size="small">
            更多
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className="file-home">
        <div className="head">
          <div className="header-line">
            <div className="left-btn-group">
              <Button type="primary" icon="upload" style={{ marginRight: '10px' }}>上传</Button>
              <Button icon="folder-add" style={{ marginRight: '10px' }}>新建目录</Button>
              <Button icon="safety-certificate" style={{ marginRight: '10px' }}>授权</Button>
              <Dropdown overlay={this.menu}>
                <Button style={{ marginRight: '10px' }}>
                  批量操作
                  <Icon type="down" />
                </Button>
              </Dropdown>

              <Button icon="reload">刷新</Button>
            </div>

            <div className="right-operate">
              <Search
                placeholder="输入文件名前缀匹配"
                onSearch={value => console.log(value)}
                style={{ width: 200, marginRight: '10px' }}
              />
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
              <Table.Column title="文件名(Object Name)" dataIndex="fileName" render={this.renderFileName} />
              <Table.Column title="大小" dataIndex="size" />
              <Table.Column title="更新时间" dataIndex="updateTime" />
              <Table.Column title="操作" width={180} render={this.renderOperate} align="center" />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
