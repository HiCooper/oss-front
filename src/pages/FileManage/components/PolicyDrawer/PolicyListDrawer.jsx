import React, { Component } from 'react';
import { Drawer, Table, Button, message } from 'antd';
import { getCurrentBucket } from '../../../../util/Bucket';
import { DeletePolicyApi, GetPolicyApi } from '../../../../api/policy';
import AddPolicyDrawer from './components/AddPolicyDrawer';
import './index.scss';


export default class PolicyListDrawer extends Component {
  static displayName = 'PolicyListDrawer';

  constructor(props) {
    super(props);
    const bucketInfo = getCurrentBucket();
    this.state = {
      bucketInfo,
      listData: [],
      selectedRowKeys: [],
      tableLoading: false,
      addPolicyDrawerVisible: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = async () => {
    await this.setState({
      tableLoading: true,
    });
    const { bucketInfo } = this.state;
    await GetPolicyApi({ bucket: bucketInfo.name })
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            listData: res.data,
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

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  renderActionType = (actionType) => {
    return ActionTypeDict[actionType];
  };

  renderEffect = (effect) => {
    return EffectDict[effect];
  };

  addDrawerOpen = () => {
    this.setState({
      addPolicyDrawerVisible: true,
    });
  };

  addDrawerClose = () => {
    this.setState({
      addPolicyDrawerVisible: false,
    });
  };

  successAddPolicy = () => {
    this.initData();
    this.setState({
      addPolicyDrawerVisible: false,
    });
  };

  deletePolicy = () => {
    const { bucketInfo, selectedRowKeys } = this.state;
    const params = {
      bucket: bucketInfo.name,
      policyIds: selectedRowKeys.toString(),
    };
    DeletePolicyApi(params).then((res) => {
      if (res.msg === 'SUCCESS') {
        message.success('删除成功');
        this.initData();
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  render() {
    const { listData, selectedRowKeys, tableLoading, addPolicyDrawerVisible } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Drawer
        width={660}
        placement="right"
        closable
        maskClosable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        className="oss-drawer policy-list-drawer"
        title="授权"
      >
        <div className="op-btn">
          <Button type="primary" style={{ marginRight: '8px' }} onClick={this.addDrawerOpen}>新增授权</Button>
          <Button style={{ marginRight: '8px' }} disabled={selectedRowKeys.length === 0} onClick={this.deletePolicy}>删除</Button>
          <div className="statis" hidden={selectedRowKeys.length === 0}>
            已选择：
            {`${selectedRowKeys.length} / ${listData.length}`}
          </div>
        </div>
        <Table rowSelection={rowSelection}
          dataSource={listData}
          pagination={false}
          rowKey="id"
          loading={tableLoading}
        >
          <Table.Column title="授权资源" dataIndex="resource" render={resource => resource.toString()} />
          <Table.Column title="授权用户" dataIndex="principal" render={principal => principal.toString()} />
          <Table.Column title="授权操作" dataIndex="actionType" render={this.renderActionType} />
          <Table.Column title="效果" dataIndex="effect" render={this.renderEffect} />
        </Table>
        {
          addPolicyDrawerVisible ? (
            <AddPolicyDrawer visible={addPolicyDrawerVisible} onClose={this.addDrawerClose} onSuccess={this.successAddPolicy} />
          ) : null
        }
      </Drawer>
    );
  }
}

const ActionTypeDict = {
  1: '只读',
  2: '读/写',
  3: '完全控制',
  4: '拒绝访问',
};
const EffectDict = {
  Allow: '允许',
  Deny: '拒绝访问',
};
