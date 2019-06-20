import React, { Component } from 'react';
import { Breadcrumb, Button, Dropdown, Icon, Input, Menu, message, Modal, Table } from 'antd';
import { getIconByFileName, getParamsFromUrl } from '../../util/stringUtils';
import { DeleteObjectHeadApi, ListObjectApi } from '../../api/object';
import './index.scss';
import UploadFileDrawer from './components/UploadFileDrawer';
import DetailDrawer from './components/DetailDrawer';
import AddFolderDrawer from './components/AddFolderDrawer';

const Search = Input.Search;

const confirm = Modal.confirm;

export default class FileManage extends Component {
  static displayName = 'FileManage';

  constructor(props) {
    super(props);
    const paramsFromUrl = getParamsFromUrl(this.props.location.search);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      objectList: [],
      bucketName: this.props.match.params.name,
      // 上传抽屉显示
      visible: false,
      currentPath: paramsFromUrl ? decodeURIComponent(paramsFromUrl.path) : '/',
      // 详情抽屉显示
      detailVisible: false,
      currentRecord: undefined,
      // 文件列表加载状态
      tableLoading: false,

      // 新建目录抽屉显示
      addFolderVisible: false,
      search: '',
    };
  }

  componentDidMount() {
    this.initObjectList();
  }

  initObjectList = async () => {
    const { currentPath, search } = this.state;
    await this.setState({
      tableLoading: true,
    });
    const path = search ? '' : currentPath;
    await ListObjectApi({
      bucket: this.state.bucketName,
      path,
      search,
    })
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            objectList: res.data,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
    this.setState({
      tableLoading: false,
    });
  };

  goSearchObject = async (val) => {
    await this.setState({
      search: val,
    });
    this.initObjectList();
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
    const { pathname } = this.props.location;
    if (record.isDir) {
      // 进入文件夹
      const path = record.filePath === '/' ? `/${record.fileName}` : `${record.filePath}/${record.fileName}`;
      await this.setState({
        currentPath: path,
      });
      this.props.history.push(`${pathname}?path=${encodeURIComponent(path)}`);
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

  handleMenuClick = (record, item) => {
    if (item.key === '4') {
      this.showDeleteConfirm(record);
    }
  };

  deleteObject = (record) => {
    const fullPath = record.filePath === '/' ? record.fileName : `${record.filePath}/${record.fileName}`;
    const params = {
      bucket: this.state.bucketName,
      objects: fullPath,
    };
    DeleteObjectHeadApi(params)
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          message.success('操作成功');
          this.initObjectList();
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('操作失败');
      });
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

  moreMenu = (record) => {
    return (
      <Menu onClick={item => this.handleMenuClick(record, item)}>
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

  showDeleteConfirm = (record, e) => {
    if (e) {
      e.preventDefault();
    }
    const thisAlias = this;
    let content = <span>删除后无法恢复，确定删除吗？</span>;
    if (record.isDir) {
      content = (
        <div>
          <p style={{ fontWeight: 'bold' }}>1. 删除后无法恢复，确定删除吗？</p>
          <p style={{ fontWeight: 'bold' }}>2. 删除目录需要一定时间，请勿重复操作</p>
        </div>
      );
    }
    confirm({
      title: (
        <div>
        即将删除
          <span style={{ color: 'red', margin: '0 5px', fontWeight: 'bold' }}>{`${record.filePath}/${record.fileName}`}</span>
          请确认!
        </div>
      ),
      centered: true,
      content,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        thisAlias.deleteObject(record);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  renderOperate = (text, record) => {
    return (
      <div>
        <Button type="link" size="small" onClick={e => this.detailDrawerShow(record, e)}>详情</Button>
        {
          record.isDir ? (
            <Button type="link" size="small" onClick={e => this.showDeleteConfirm(record, e)}>删除</Button>
          ) : (
            <Dropdown overlay={this.moreMenu(record)} size="small">
              <Button type="link" size="small">
                更多
                <Icon type="down" />
              </Button>
            </Dropdown>
          )
        }
      </div>
    );
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  showAddFolderDrawer = () => {
    this.setState({
      addFolderVisible: true,
    });
  };

  closeDrawer = () => {
    this.setState({
      visible: false,
    });
  };

  closeAddFolderDrawer = () => {
    this.setState({
      addFolderVisible: false,
    });
  };

  goPath = async (index, e) => {
    e.preventDefault();
    const { currentPath } = this.state;
    const pathQueue = currentPath.length > 1 ? currentPath.substr(1).split('/') : null;
    let path = '/';
    if (pathQueue) {
      for (let i = 0; i < index; i++) {
        if (path === '/') {
          path += pathQueue[i];
        } else {
          path += `/${pathQueue[i]}`;
        }
      }
    }
    const { pathname } = this.props.location;
    await this.setState({
      currentPath: path,
    });
    this.props.history.push(`${pathname}?path=${encodeURIComponent(path)}`);
    this.initObjectList();
  };

  render() {
    const { tableLoading, objectList, selectedRowKeys, visible, addFolderVisible, currentPath, detailVisible, currentRecord, search } = this.state;
    const pathQueue = currentPath.length > 1 ? currentPath.substr(1).split('/') : null;
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
              {
                visible ? (
                  <UploadFileDrawer
                    currentPath={currentPath}
                    onClose={this.closeDrawer}
                    visible={visible}
                    onSuccess={this.initObjectList}
                  />
                ) : null
              }
              <Button icon="folder-add" style={{ marginRight: '10px' }} onClick={this.showAddFolderDrawer}>新建目录</Button>
              {
                addFolderVisible ? (
                  <AddFolderDrawer
                    onClose={this.closeAddFolderDrawer}
                    visible={addFolderVisible}
                    onSuccess={this.initObjectList}
                  />
                ) : null
              }
              <Button icon="safety-certificate" style={{ marginRight: '10px' }}>授权</Button>
              <Dropdown overlay={this.menu}>
                <Button style={{ marginRight: '10px' }}>
                  批量操作
                  <Icon type="down" />
                </Button>
              </Dropdown>

              <Button icon="reload" onClick={this.initObjectList}>刷新</Button>
            </div>

            <div className="right-operate">
              <Search
                placeholder="输入文件名前缀匹配"
                onSearch={value => this.goSearchObject(value)}
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
              <Breadcrumb.Item key="root" onClick={e => this.goPath(0, e)}>
                <Button type="link">我的文件</Button>
              </Breadcrumb.Item>
              {
                pathQueue && pathQueue.length > 0 ? pathQueue.map((item, index) => {
                  if (index === pathQueue.length - 1) {
                    return (
                      <Breadcrumb.Item key={index + 1}>
                        <span style={{ padding: '0 8px' }}>{item}</span>
                      </Breadcrumb.Item>
                    );
                  }
                  return (
                    <Breadcrumb.Item key={index} onClick={e => this.goPath(index + 1, e)}>
                      <Button type="link">{item}</Button>
                    </Breadcrumb.Item>
                  );
                }) : null
              }
            </Breadcrumb>
          </div>

          <div className="table">
            <Table rowSelection={rowSelection}
              dataSource={objectList}
              pagination={false}
              rowKey="id"
              loading={tableLoading}
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
              {
                search ? (
                  <Table.Column title="路径" dataIndex="filePath" />
                ) : null
              }
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
