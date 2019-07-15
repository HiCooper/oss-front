import React, { Component } from 'react';
import { Button, Drawer, Form, Icon, Input, Radio, Tooltip } from 'antd';
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

const TextArea = Input.TextArea;

class AuthDrawer extends Component {
  static displayName = 'AddBucketDrawer';

  constructor(props) {
    super(props);
    const bucketInfo = getCurrentBucket();
    this.state = {
      bucketInfo,
      resourcePathRadio: `${bucketInfo.name}/*`,
      defaultResourcePath: `${bucketInfo.name}/*`,
      actionType: 1,
      resource: '',
      submitLoading: false,
    };
  }

  addAuthSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitLoading: true,
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { actionType, principal } = values;
        const params = {
          actionType,
          principal: principal.replace(/ /g, '').split('\n'),
        };
        if (values.resource === 'CUSTOM') {
          params.resource = this.state.resource.split(',');
        } else {
          params.resource = this.state.defaultResourcePath.split(',');
        }
        console.log(params);
      }
    });
    this.setState({
      submitLoading: false,
    });
  };

  resourcePathChange = (e) => {
    e.preventDefault();
    this.setState({
      resourcePathRadio: e.target.value,
    });
  };

  inputResourceChange = (e) => {
    this.setState({
      resource: e.target.value,
    });
  };

  render() {
    const { actionType, submitLoading, resource, defaultResourcePath, resourcePathRadio, bucketInfo } = this.state;
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
        title="新增授权"
      >
        <Form {...formItemLayout} onSubmit={this.addAuthSubmit} hideRequiredMark>
          <Form.Item label="授权资源">
            {
              getFieldDecorator('resource', {
                initialValue: defaultResourcePath,
              })(
                <Radio.Group onChange={this.resourcePathChange}>
                  <Radio.Button value={defaultResourcePath}>整个 Bucket</Radio.Button>
                  <Radio.Button value="CUSTOM">指定资源</Radio.Button>
                </Radio.Group>
              )
            }
          </Form.Item>

          <Form.Item label={(
            <span>
              资源路径
              <Tooltip autoAdjustOverflow
                arrowPointAtCenter
                placement="topLeft"
                title={(
                  <span>
                    指您能够允许或者拒绝授权操作的对象。您可以指定一个 Bucket 、对象或者目录，当您给某个目录授权时，请使用通配符*结尾。例如
                    <code>
                      test-bucket/test/
                      {'*'}
                    </code>
                    。多个资源请使用英文逗号分隔。
                  </span>
                )}
              >
                <Icon type="question-circle-o" style={{ margin: '0 5px' }} />
              </Tooltip>
            </span>
          )}
          >
            {
              resourcePathRadio === defaultResourcePath ? (
                <span>{defaultResourcePath}</span>
              ) : (
                <div style={{ display: 'flex' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>{`${bucketInfo.name}/`}</span>
                  <div style={{ marginLeft: '8px', width: '100%' }}>
                    <Input placeholder="资源路径" value={resource} onChange={this.inputResourceChange} />
                  </div>
                </div>
              )
            }
          </Form.Item>
          <Form.Item label={(
            <span>
              授权用户
              <Tooltip autoAdjustOverflow
                arrowPointAtCenter
                placement="topLeft"
                title={(
                  <span>
                     指被允许或者拒绝访问资源的账号。请输入对应账号或者子用户的 用户名。多个被授权用户请换行。不支持输入通配符*。
                  </span>
                )}
              >
                <Icon type="question-circle-o" style={{ margin: '0 5px' }} />
              </Tooltip>
            </span>
          )}
          >
            {
              getFieldDecorator('principal', {
                rules: [{
                  required: true,
                  message: '请输入授权用户!',
                }],
              })(
                <TextArea rows={4} placeholder="请输入被授权用户的用户名" />,
              )
            }
          </Form.Item>
          <Form.Item
            label="授权操作"
          >
            {
              getFieldDecorator('actionType', {
                rules: [{
                  required: true,
                  message: '请选择授权操作!',
                }],
                initialValue: actionType,
              })(
                <Radio.Group>
                  <Radio.Button value={1}>只读</Radio.Button>
                  <Radio.Button value={2}>读/写</Radio.Button>
                  <Radio.Button value={3}>完全控制</Radio.Button>
                  <Radio.Button value={4}>拒绝访问</Radio.Button>
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
              disabled={!!getFieldError('principal')}
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

const WrappedAddBucketDrawer = Form.create({ name: 'normal_login' })(AuthDrawer);

export default WrappedAddBucketDrawer;
