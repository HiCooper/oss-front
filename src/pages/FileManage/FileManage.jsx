import React, { Component } from 'react';
import { Breadcrumb, Button, Dropdown, Icon, Input, Menu, Table } from 'antd';
import { getIconByFileName } from '../../util/stringUtils';
import { ListObjectApi } from '../../api/object';
import './index.scss';
import UploadFileDrawer from './components/UploadFileDrawer';
import DetailDrawer from './components/DetailDrawer';

const Search = Input.Search;

export default class FileManage extends Component {
  static displayName = 'FileManage';

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      objectList: [],
      bucketName: this.props.match.params.name,
      // 上传抽屉显示
      visible: false,
      currentPath: '/',
      // 详情抽屉显示
      detailVisible: false,
      currentRecord: undefined,
      pathQueue: [{
        name: '我的文件',
        path: '/',
      }],
    };
  }

  componentDidMount() {
    this.initObjectList();
  }

  initObjectList = () => {
    const { currentPath } = this.state;
    ListObjectApi({ bucketName: this.state.bucketName, path: currentPath })
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            objectList: res.data.records.sort((a, b) => b.isDir - a.isDir),
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  renderFileName = (val, record) => {
    let color = 'green';
    if (record.isDir) {
      color = '#ffeb3b';
    }
    return (
      <div>
        <Icon type={getIconByFileName(record)}
          theme="filled"
          style={{
            color,
            marginRight: '8px',
            fontSize: '18px',
          }}
        />
        <span className="list-file-name" onClick={e => this.detailDrawerShow(record, e)}>{val}</span>
      </div>
    );
  };

  onRowClick = (record, e) => {
    e.preventDefault();
    this.setState({
      selectedRowKeys: [record.id],
    });
  };

  onRowDoubleClick = async (record, e) => {
    e.preventDefault();
    const { pathQueue } = this.state;
    if (record.isDir) {
      // 进入文件夹
      const parent = record.filePath === '/' ? '/' : `${record.filePath}/`;
      const path = parent + record.fileName;
      pathQueue.push({
        name: record.fileName,
        path,
      });
      await this.setState({
        currentPath: path,
        pathQueue,
      });
      this.initObjectList();
    }
  };

  onRowContextMenu = (record, e) => {
    e.preventDefault();
  };

  onRowMouseEnter = (record, e) => {
    e.preventDefault();
  };

  onRowMouseLeave = (record, e) => {
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

  moreMenu = (isDir) => {
    if (isDir) {
      return (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1">
            设置读写权限
          </Menu.Item>
          <Menu.Item key="4">
            删除
          </Menu.Item>
        </Menu>
      );
    }
    return (
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
  };

  detailDrawerClose = () => {
    this.setState({
      detailVisible: false,
      currentRecord: undefined,
    });
  };

  detailDrawerShow = (record, e) => {
    e.preventDefault();
    this.setState({
      detailVisible: true,
      currentRecord: record,
    });
  };

  renderOperate = (text, record) => {
    return (
      <div>
        <Button type="link" size="small" onClick={e => this.detailDrawerShow(record, e)}>详情</Button>
        <Dropdown overlay={this.moreMenu(record.isDir)} size="small">
          <Button type="link" size="small">
            更多
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  closeDrawer = () => {
    this.setState({
      visible: false,
    });
  };

  goPath = async (path, e) => {
    e.preventDefault();
    const { pathQueue } = this.state;
    const last = pathQueue[pathQueue.length - 1];
    if (path === last.path) {
      return;
    }
    pathQueue.pop();
    while (pathQueue[pathQueue.length - 1].path !== path) {
      pathQueue.pop();
    }
    await this.setState({
      currentPath: path,
      pathQueue,
    });
    this.initObjectList();
  };

  render() {
    const { pathQueue, objectList, selectedRowKeys, visible, currentPath, detailVisible, currentRecord } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className="file-home">
        <div className="head">
          <div className="header-line">
            <div className="left-btn-group">
              <Button type="primary" icon="upload" style={{ marginRight: '10px' }} onClick={this.showDrawer}>上传</Button>
              <UploadFileDrawer currentPath={currentPath}
                onClose={this.closeDrawer}
                visible={visible}
                onSuccess={this.initObjectList}
              />
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
                style={{
                  width: 200,
                  marginRight: '10px',
                }}
              />
            </div>
          </div>
        </div>

        <div className="list-content">
          <div className="breadcrumb">
            <Breadcrumb separator=">">
              {
                pathQueue.map((item, index) => {
                  if (index === pathQueue.length - 1) {
                    return (
                      <Breadcrumb.Item key={index} style={{ margin: '0 9px', cursor: 'point', lineHeight: '32px' }}>{item.name}</Breadcrumb.Item>
                    );
                  }
                  return (
                    <Breadcrumb.Item key={index} onClick={e => this.goPath(item.path, e)}>
                      <Button type="link">{item.name}</Button>
                    </Breadcrumb.Item>
                  );
                })
              }
            </Breadcrumb>
          </div>

          <div className="table">
            <Table rowSelection={rowSelection}
              dataSource={objectList}
              pagination={false}
              rowKey="id"
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    this.onRowClick(record, e);
                  }, // 点击行
                  onDoubleClick: (e) => {
                    this.onRowDoubleClick(record, e);
                  },
                  onContextMenu: (e) => {
                    this.onRowContextMenu(record, e);
                  },
                  onMouseEnter: (e) => {
                    this.onRowMouseEnter(record, e);
                  }, // 鼠标移入行
                  onMouseLeave: (e) => {
                    this.onRowMouseLeave(record, e);
                  },
                };
              }}
            >
              <Table.Column title="文件名(Object Name)" dataIndex="fileName" render={this.renderFileName} />
              <Table.Column title="大小" dataIndex="formattedSize" />
              <Table.Column title="更新时间" dataIndex="updateTime" />
              <Table.Column title="操作" width={180} render={this.renderOperate} align="center" />
            </Table>
            {
              currentRecord ? (
                <DetailDrawer info={currentRecord} onClose={this.detailDrawerClose} visible={detailVisible} />
              ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}
