import React, { Component } from 'react';
import { Button, Drawer, Form, Input, Radio } from 'antd';
import './index.scss';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
export default class AddBucketDrawer extends Component {
  static displayName = 'AddBucketDrawer';

  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = () => {
    this.props.onClose();
  };

  handleSizeChange = (val) => {
    console.log(val);
  };

  render() {
    return (
      <Drawer
        width={640}
        placement="right"
        closable
        maskClosable={false}
        onClose={this.onClose}
        visible={this.props.visible}
        className="add-bucket-drawer"
        title="新建 Bucket"
      >
        <Form {...formItemLayout}>
          <Form.Item
            label="Bucket 名称"
            validateStatus="success"
            help="最多63个字母或数字"
          >
            <Input placeholder="Bucket" id="error" />
          </Form.Item>

          <Form.Item
            label="读写权限"
            validateStatus="success"
            help="私有：对文件的所有访问操作需要进行身份验证。"
          >
            <Radio.Group defaultValue="私有" onChange={this.handleSizeChange}>
              <Radio.Button value="私有">私有</Radio.Button>
              <Radio.Button value="公共读">公共读</Radio.Button>
              <Radio.Button value="公共读写">公共读写</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>

        <div className="form-btn">
          <Button onClick={this.onClose}
            type="primary"
            style={{
              marginRight: 8,
            }}
          >
            确认
          </Button>
          <Button onClick={this.onClose}>
            取消
          </Button>
        </div>
      </Drawer>
    );
  }
}
