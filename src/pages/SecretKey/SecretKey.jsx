import React, { Component } from 'react';
import XLSX from 'xlsx';
import './index.scss';
import { Alert, Button, Collapse, Divider, Form, Icon, Input, Modal, Table, message } from 'antd';
import {
  CreateAccessKeyApi,
  DeleteAccessKeyApi,
  DisableAccessKeyApi,
  EnableAccessKeyApi,
  ListAccessKeyApi,
} from '../../api/accessKey';
import { dateFormat } from '../../util/DateUtil';

const confirm = Modal.confirm;
const { Panel } = Collapse;
class SecretKey extends Component {
  static displayName = 'SecretKey';

  constructor(props) {
    super(props);
    this.state = {
      accessKeyList: [],
      modelLoading: false,
      tableLoading: false,
      showCreateModel: false,
      generateSuccess: false,
      genLoading: false,
      showKeySecret: [],
      // 新创建的密钥对
      genAccessKeyPair: null,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    ListAccessKeyApi().then((res) => {
      if (res.msg === 'SUCCESS') {
        this.setState({
          accessKeyList: res.data,
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  showDisableKeyWarning = (record, e) => {
    e.preventDefault();
    const thisAlias = this;
    confirm({
      title: (
        <div>
          你确定要
          <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px' }}>禁用</span>
          AccessKey:
          <span style={{
            color: 'green',
            margin: '0 5px',
            fontWeight: 'bold',
          }}
          >
            {record.AccessKeyId}
          </span>
          吗?
        </div>
      ),
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        thisAlias.disableKey(record);
      },
    });
  };

  disableKey =(record) => {
    DisableAccessKeyApi({ accessKeyId: record.accessKeyId }).then((res) => {
      if (res.msg === 'SUCCESS') {
        message.success('操作成功');
        this.initData();
      }
    }).catch((e) => {
      console.error(e);
      message.success('操作失败');
    });
  };

  showEnableKeyWarning = (record, e) => {
    e.preventDefault();
    const thisAlias = this;
    confirm({
      title: (
        <div>
          你确定要
          <span style={{ color: 'green', fontWeight: 'bold', margin: '0 5px' }}>启用</span>
          AccessKey:
          <span style={{
            color: '#607D8B',
            margin: '0 5px',
            fontWeight: 'bold',
          }}
          >
            {record.AccessKeyId}
          </span>
          吗?
        </div>
      ),
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        thisAlias.enableKey(record);
      },
    });
  };

  enableKey =(record) => {
    EnableAccessKeyApi({ accessKeyId: record.accessKeyId }).then((res) => {
      if (res.msg === 'SUCCESS') {
        message.success('操作成功');
        this.initData();
      }
    }).catch((e) => {
      console.error(e);
      message.success('操作失败');
    });
  };

  showDeleteKeyWarning = (record, e) => {
    e.preventDefault();
    const thisAlias = this;
    confirm({
      title: (
        <div>
          你确定要
          <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px' }}>删除</span>
          AccessKey:
          <span style={{
            color: 'green',
            margin: '0 5px',
            fontWeight: 'bold',
          }}
          >
            {record.AccessKeyId}
          </span>
          吗?
        </div>
      ),
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        thisAlias.deleteKey(record);
      },
    });
  };

  deleteKey =(record) => {
    DeleteAccessKeyApi({ accessKeyId: record.accessKeyId }).then((res) => {
      if (res.msg === 'SUCCESS') {
        message.success('操作成功');
        this.initData();
      }
    }).catch((e) => {
      console.error(e);
      message.success('操作失败');
    });
  };

  renderOp = (text, record) => {
    return (
      <div>
        {
          !record.state ? (
            <Button type="link" size="small" onClick={e => this.showEnableKeyWarning(record, e)}>启用</Button>
          ) : (
            <Button type="link" size="small" onClick={e => this.showDisableKeyWarning(record, e)}>禁用</Button>
          )
        }
        <Divider type="vertical" />
        <Button type="link" size="small" onClick={e => this.showDeleteKeyWarning(record, e)}>删除</Button>
      </div>
    );
  };

  renderState = (state) => {
    if (state) {
      return (
        <span style={{ color: '#009900' }}>启用</span>
      );
    }
    return (
      <span style={{ color: 'red' }}>禁用</span>
    );
  };

  renderAccessKeySecret = (text, record) => {
    const { showKeySecret } = this.state;
    const find = showKeySecret.find(i => i === record.accessKeyId);
    if (find) {
      return (
        <div>
          <span className="access-key-secret-text">{text}</span>
          <Button type="link" size="small" onClick={e => this.showKeySecret(record, e)}>隐藏</Button>
        </div>
      );
    }
    return (
      <Button type="link" size="small" onClick={e => this.showKeySecret(record, e)}>显示</Button>
    );
  };

  showKeySecret = (record, e) => {
    e.preventDefault();
    const { showKeySecret } = this.state;
    const filter = showKeySecret.filter(i => i !== record.accessKeyId);
    if (filter.length === showKeySecret.length) {
      filter.push(record.accessKeyId);
    }
    this.setState({
      showKeySecret: filter,
    });
  };

  saveAKInfo = () => {
    const { genAccessKeyPair } = this.state;
    const excelData = [
      ['AccessKeyId', 'AccessKeySecret'],
      [genAccessKeyPair.accessKeyId, genAccessKeyPair.accessKeySecret],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'SheetJS');
    const time = new Date();
    const timeStr = dateFormat(time, 'yyyyMMddhhmmss');
    XLSX.writeFile(wb, `${timeStr}.csv`);
  };

  showModel = () => {
    this.setState({
      showCreateModel: true,
    });
  };

  // 关闭创建弹窗，所有信息重置
  closeModel = () => {
    this.setState({
      showCreateModel: false,
      generateSuccess: false,
      genLoading: false,
      genAccessKeyPair: null,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          genLoading: true,
        });
        console.log('Received values of form: ', values);
        console.log('generate success');
        CreateAccessKeyApi(values).then((res) => {
          if (res.msg === 'SUCCESS') {
            this.setState({
              genAccessKeyPair: res.data,
              generateSuccess: true,
            });
            this.initData();
          }
        }).catch((error) => {
          console.error(error);
        });
      }
      this.setState({
        genLoading: false,
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { accessKeyList, tableLoading, generateSuccess, showCreateModel, modelLoading, genLoading, genAccessKeyPair } = this.state;
    return (
      <div className="secret-key">
        <div className="bread">
          密钥管理
        </div>
        <Divider type="horizontal" />
        <div className="help-info">
          注意：每个账户最多能创建 3个 密钥对
        </div>
        <Alert
          style={{ margin: '10px 0', fontSize: '12px' }}
          message="AccessKey ID和AccessKey Secret是您访问 OSS API的密钥，具有该账户完全的权限，请您妥善保管。"
          type="warning"
          showIcon
        />
        <div className="table-viewer-header">
          <span className="table-viewer-topbar-title">
            用户AccessKey
          </span>
          {
            accessKeyList.length < 3 ? (
              <div className="pull-right">
                <Button type="default" size="small" onClick={this.showModel}>
                  创建AccessKey
                </Button>
              </div>
            ) : null
          }
        </div>
        <Table
          className="secret-table"
          rowKey="accessKeyId"
          dataSource={accessKeyList}
          pagination={false}
          loading={tableLoading}
        >
          <Table.Column title="AccessKey ID" dataIndex="accessKeyId" />
          <Table.Column width={400} title="Access Key Secret" dataIndex="accessKeySecret" render={this.renderAccessKeySecret} />
          <Table.Column title="状态" dataIndex="state" render={this.renderState} />
          <Table.Column title="创建时间" dataIndex="createTime" />
          <Table.Column title="操作"
            render={this.renderOp}
          />
        </Table>
        {
          showCreateModel ? (
            <Modal
              maskClosable={false}
              visible={showCreateModel}
              title="新建用户 AccessKey"
              onCancel={this.closeModel}
              width={650}
              footer={
                generateSuccess && genAccessKeyPair ? (
                  [
                    <Button key="submit" type="primary" loading={modelLoading} onClick={this.saveAKInfo}>
                      保存AK信息
                    </Button>,
                  ]
                ) : (
                  [
                    <Button key="submit" type="default" onClick={this.closeModel}>
                      取消
                    </Button>,
                  ]
                )
              }
            >
              {
                generateSuccess && genAccessKeyPair ? (
                  <div>
                    <Alert style={{ fontSize: '12px' }} message="这是用户 AccessKey 可供下载的唯一机会，请及时保存！" type="success" />
                    <div style={{ textAlign: 'center', lineHeight: '100px' }}>
                      <h1>
                        <Icon type="check-circle" style={{ color: 'green', marginRight: '10px' }} />
                        新建AccessKey成功！
                      </h1>
                    </div>
                    <Collapse defaultActiveKey={['1']}>
                      <Panel header="AccessKey 详情" key="1">
                        <div style={styles.newAccessKeyDetail}>
                          <div style={{ ...styles.item, ...styles.br }}>
                            <p style={styles.label}>AccessKeyID:</p>
                            <p style={styles.value}>{genAccessKeyPair.accessKeyId}</p>
                          </div>
                          <div style={styles.item}>
                            <p style={styles.label}>AccessKeySecret:</p>
                            <p style={styles.value}>{genAccessKeyPair.accessKeySecret}</p>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                ) : (
                  <div className="check-auth">
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                      <Form.Item label="校验当前用户密码">
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: '请输入当前用户密码!' }],
                        })(
                          <Input placeholder="请输入密码" type="password" />
                        )}
                      </Form.Item>
                      <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit" loading={genLoading}>
                          生成 AccessKey
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                )
              }
            </Modal>
          ) : null
        }
      </div>
    );
  }
}
const styles = {
  newAccessKeyDetail: {
    display: 'flex',
  },
  item: {
    flex: '1 1 50%',
    padding: '0 10px',
  },
  br: {
    borderRight: '1px solid #d9d9d9',
  },
  label: {
    fontSize: '12px',
  },
  value: {
    fontSize: '12px',
    color: '#7d6767',
    fontWeight: 'bold',
  },
};

const WrappedSecretKey = Form.create({ name: 'coordinated' })(SecretKey);
export default WrappedSecretKey;
