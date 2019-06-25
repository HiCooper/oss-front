import React, { Component } from 'react';
import './index.scss';
import { Alert, Button, Divider, Table } from 'antd';

const data = [
  {
    AccessKeyId: 'LTAI6Mf6vkhsILcs',
    AccessKeySecret: 'Lmi3Uz2sdqq6NRwR71FynQqB1wDI6b',
    createTime: '2019-06-25 22:07:04',
  },
];
export default class SecretKey extends Component {
  static displayName = 'SecretKey';

  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
    };
  }

  renderOp = (text, record) => {
    return (
      <div>
        <Button type="link" size="small">禁用</Button>
        <Divider type="vertical" />
        <Button type="link" size="small">删除</Button>
      </div>
    );
  };

  renderAccessKeySecret = (text, record) => {
    return (
      <Button type="link" size="small">显示</Button>
    );
  };

  render() {
    const { tableLoading } = this.state;
    return (
      <div className="secret-key">
        <div className="bread">
          密钥管理
        </div>
        <Divider type="horizontal" />
        <Alert style={{ margin: '10px 0', fontSize: '12px' }} message="AccessKey ID和AccessKey Secret是您访问 OSS API的密钥，具有该账户完全的权限，请您妥善保管。" type="warning" showIcon />
        <div className="table-viewer-header">
          <span className="table-viewer-topbar-title">
            用户AccessKey
          </span>
          <div className="pull-right">
            <Button type="default" size="small">
              创建AccessKey
            </Button>
          </div>
        </div>
        <Table
          className="secret-table"
          rowKey="AccessKeyId"
          dataSource={data}
          pagination={false}
          loading={tableLoading}
        >
          <Table.Column title="AccessKey ID" dataIndex="AccessKeyId" />
          <Table.Column title="Access Key Secret" dataIndex="AccessKeySecret" render={this.renderAccessKeySecret} />
          <Table.Column title="状态" dataIndex="state" />
          <Table.Column title="创建时间" dataIndex="createTime" />
          <Table.Column title="操作"
            render={this.renderOp}
          />
        </Table>
      </div>
    );
  }
}
