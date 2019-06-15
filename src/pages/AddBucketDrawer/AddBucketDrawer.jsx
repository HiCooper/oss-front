import React, { Component } from 'react';
import { Button, Drawer, Form, Input, Radio, message } from 'antd';
import { CreateBucketApi } from '../../api/bucket';

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
class AddBucketDrawer extends Component {
  static displayName = 'AddBucketDrawer';

  constructor(props) {
    super(props);
    this.state = {
      acl: 'PRIVATE',
      name: '',
      submitLoading: false,
    };
  }

  createBucketSubmit = (e) => {
    this.setState({
      submitLoading: true,
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        CreateBucketApi(values).then((res) => {
          if (res.msg === 'SUCCESS') {
            message.success(`创建 Bucket ${values.name}成功!`);
            this.props.flushList();
            this.onClose();
          } else {
            message.error('创建失败');
          }
        }).catch((error) => {
          console.error(error);
          message.error('创建失败');
        });
      }
    });
    this.setState({
      submitLoading: false,
    });
  };

  render() {
    const { name, acl, submitLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Drawer
        width={640}
        placement="right"
        closable
        maskClosable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        className="oss-drawer"
        title="新建 Bucket"
      >
        <Form {...formItemLayout} onSubmit={this.createBucketSubmit}>
          <Form.Item
            label="Bucket 名称"
            validateStatus="success"
            help="最多63个字母或数字"
          >
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入用户名!' }],
                initialValue: name,
              })(
                <Input placeholder="Bucket" allowClear />
              )
            }
          </Form.Item>

          <Form.Item
            label="读写权限"
            validateStatus="success"
            help="私有：对文件的所有访问操作需要进行身份验证。"
          >
            {
              getFieldDecorator('acl', {
                rules: [{ required: true, message: '请选择读写权限!' }],
                initialValue: acl,
              })(
                <Radio.Group>
                  <Radio.Button value="PRIVATE">私有</Radio.Button>
                  <Radio.Button value="PUBLIC_READ">公共读</Radio.Button>
                  <Radio.Button value="PUBLIC">公共读写</Radio.Button>
                </Radio.Group>
              )
            }
          </Form.Item>
          <div className="form-btn">
            <Button
              loading={submitLoading}
              type="primary"
              htmlType="submit"
              style={{
                marginRight: 8,
              }}
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

const WrappedAddBucketDrawer = Form.create({ name: 'normal_login' })(AddBucketDrawer);

export default WrappedAddBucketDrawer;
