import React, { Component } from 'react';
import { Button, Drawer, Form, Input, message, Radio, Select } from 'antd';
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

const { Option } = Select;

const ACLMessageTable = {
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
  PUBLIC:
  <span style={{
    color: 'red',
    fontSize: '12px',
  }}
  >
公共读写：所有人都可以对文件进行读写操作。
  </span>,
};

class AddBucketDrawer extends Component {
  static displayName = 'AddBucketDrawer';

  constructor(props) {
    super(props);
    this.state = {
      acl: 'PRIVATE',
      name: '',
      submitLoading: false,
      aclMessage: ACLMessageTable.PRIVATE,
      region: 'oss-shanghai-1',
    };
  }

  createBucketSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitLoading: true,
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        CreateBucketApi(values)
          .then((res) => {
            if (res.msg === 'SUCCESS') {
              message.success(`创建 Bucket ${values.name}成功!`);
              this.props.onSuccess();
              this.props.onClose();
            } else {
              message.error(res.msg);
            }
          })
          .catch((error) => {
            console.error(error);
            message.error('创建失败');
          });
      }
    });
    this.setState({
      submitLoading: false,
    });
  };

  aclChange = (e) => {
    e.preventDefault();
    this.setState({
      aclMessage: ACLMessageTable[e.target.value],
    });
  };

  checkBucketName = (rule, value, callback) => {
    if (!value || value.trim().length < 3 || value.trim().length > 63) {
      callback(<span style={{ fontSize: '12px' }}>请输入 Bucket 名称，3-63个字符长度</span>);
      return;
    }
    if (!/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(value)) {
      callback(<span style={{ fontSize: '12px' }}>只允许小写字母、数字、中划线（-），且不能以短横线开头或结尾</span>);
      return;
    }
    this.setState({
      name: value,
    });
    callback();
  };

  render() {
    const { name, acl, submitLoading, aclMessage, region } = this.state;
    const { getFieldDecorator, getFieldError } = this.props.form;
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
          <Form.Item label="Bucket 名称" extra={<span style={{ fontSize: '12px' }}>Bucket 名称，3-63 个字符</span>}>
            {
              getFieldDecorator('name', {
                rules: [
                  { validator: this.checkBucketName },
                ],
                initialValue: name,
              })(
                <Input placeholder="Bucket" suffix={`${name.length}/254`} />,
              )
            }
          </Form.Item>

          <Form.Item
            label="所属区域"
            validateStatus="success"
          >
            {
              getFieldDecorator('region', {
                rules: [{
                  required: true,
                  message: '请选择所属区域!',
                }],
                initialValue: region,
              })(
                <Select placeholder="请选择所属区域">
                  <Option value="oss-shanghai-1">华东1 上海</Option>
                </Select>,
              )
            }
          </Form.Item>

          <Form.Item
            label="读写权限"
            validateStatus="success"
            help={aclMessage}
          >
            {
              getFieldDecorator('acl', {
                rules: [{
                  required: true,
                  message: '请选择读写权限!',
                }],
                initialValue: acl,
              })(
                <Radio.Group onChange={this.aclChange}>
                  <Radio.Button value="PRIVATE">私有</Radio.Button>
                  <Radio.Button value="PUBLIC_READ">公共读</Radio.Button>
                  <Radio.Button value="PUBLIC">公共读写</Radio.Button>
                </Radio.Group>,
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
              disabled={!!getFieldError('name') || !name}
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
