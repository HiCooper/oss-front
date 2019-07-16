import React, { Component } from 'react';
import { Button, Drawer, Form, message, Radio } from 'antd';
import { SetObjectAclApi } from '../../../../api/object';
import { getCurrentBucket } from '../../../../util/Bucket';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    s: { span: 5 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    s: { span: 19 },
    sm: { span: 20 },
  },
};


const ACLMessageTable = {
  EXTEND_BUCKET:
  <span style={{ fontSize: '12px' }}>继承 Bucket：单个文件的读写权限按 Bucket 的读写权限为准。</span>,
  PRIVATE:
  <span style={{ fontSize: '12px' }}>私有：对文件的所有访问操作需要进行身份验证。</span>,
  PUBLIC_READ:
  <span style={{
    color: 'red',
    fontSize: '12px',
  }}
  >
公共读：对文件写操作需要进行身份验证；可以对文件进行匿名读。
  </span>,
  PUBLIC_READ_WRITE:
  <span style={{
    color: 'red',
    fontSize: '12px',
  }}
  >
公共读写：所有人都可以对文件进行读写操作。
  </span>,
};

class SetObjectAclDrawer extends Component {
  static displayName = 'SetObjectAclDrawer';

  constructor(props) {
    super(props);
    const bucketInfo = getCurrentBucket();
    this.state = {
      bucketInfo,
      defaultAcl: this.props.info.acl,
      acl: this.props.info.acl,
      submitLoading: false,
      aclMessage: ACLMessageTable[bucketInfo.acl],
      objectInfo: this.props.info,
    };
  }

  aclChange = (e) => {
    e.preventDefault();
    this.setState({
      aclMessage: ACLMessageTable[e.target.value],
      acl: e.target.value,
    });
  };

  setObjectAclSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitLoading: true,
    });
    const { bucketInfo, objectInfo, acl } = this.state;
    const params = {
      bucket: bucketInfo.name,
      objectPath: objectInfo.filePath,
      objectName: objectInfo.fileName,
      acl,
    };
    SetObjectAclApi(params)
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          message.success('操作成功');
          this.props.onSuccess();
          this.props.onClose();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({
      submitLoading: false,
    });
  };

  render() {
    const { defaultAcl, acl, submitLoading, aclMessage } = this.state;
    return (
      <Drawer
        width={640}
        placement="right"
        closable
        maskClosable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        className="oss-drawer"
        title="设置读写权限"
      >
        <Form {...formItemLayout} onSubmit={this.setObjectAclSubmit}>
          <Form.Item
            label="读写权限"
            validateStatus="success"
            help={aclMessage}
          >
            <Radio.Group defaultValue={defaultAcl} value={acl} onChange={this.aclChange}>
              <Radio.Button value="EXTEND_BUCKET">继承 Bucket</Radio.Button>
              <Radio.Button value="PRIVATE">私有</Radio.Button>
              <Radio.Button value="PUBLIC_READ">公共读</Radio.Button>
              <Radio.Button value="PUBLIC_READ_WRITE">公共读写</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <div className="form-btn">
            <Button
              loading={submitLoading}
              type="primary"
              htmlType="submit"
              style={{
                marginRight: 8,
              }}
              disabled={defaultAcl === acl}
            >
              确认
            </Button>
            <Button onClick={this.props.onClose}>
              取消
            </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}

const WrappedSetObjectAclDrawer = Form.create({ name: 'normal_login' })(SetObjectAclDrawer);

export default WrappedSetObjectAclDrawer;
