import React, { Component } from 'react';
import { Breadcrumb, Button, Col, Dropdown, Icon, Input, Menu, Row, Table } from 'antd';
import { getIconByFileName, getParamsFromUrl } from '../../util/stringUtils';
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
    const params = getParamsFromUrl(this.props.location.search);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      vmode: params.vmode || 'list',
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
    const { selectedRowKeys, vmode } = this.state;
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
                    <Table.Column title="文件名(Object Name)" dataIndex="fileName" render={this.renderFileName} />
                    <Table.Column title="大小" dataIndex="size" />
                    <Table.Column title="更新时间" dataIndex="updateTime" />
                    <Table.Column title="操作" width={180} render={this.renderOperate} align="center" />
                  </Table>
                ) : (
                  <div>
                    <Row>
                      {
                          data.map((i, index) => {
                            return (
                              <Col key={index}>
                                <div className="item">
                                  <div className="file-icon" />
                                  <span className="file-name">{i.fileName}</span>
                                </div>
                              </Col>
                            );
                          })
                        }
                    </Row>
                  </div>
                )
              }
          </div>
        </div>
      </div>
    );
  }
}
