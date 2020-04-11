import React, { Component } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, message, Radio, Tooltip } from 'antd';
import { getCurrentBucket } from '../../../../../util/Bucket';
import { AddPolicyApi } from '../../../../../api/policy';

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

export default class AddPolicyDrawer extends Component {
  static displayName = 'AddPolicyDrawer';

  formRef = React.createRef();

  constructor(props) {
    super(props);
    const bucketInfo = getCurrentBucket();
    this.state = {
      bucketInfo,
      resourcePathRadio: `${bucketInfo.name}/*`,
      defaultResourcePath: `${bucketInfo.name}/*`,
      actionType: 1,
      submitLoading: false,
    };
  }

  addAuthSubmit = async (values) => {
    const { bucketInfo, resourcePathRadio } = this.state;
    await this.setState({
      submitLoading: true,
    });
    const { actionType, principal } = values;
    const params = {
      bucket: bucketInfo.name,
      actionType,
      principal: principal.replace(/ /g, '').split('\n'),
    };
    if (resourcePathRadio === 'CUSTOM') {
      params.resource = values.resource.split(',')
        .map(item => `${bucketInfo.name}/${item}`);
    } else {
      params.resource = this.state.defaultResourcePath.split(',');
    }
    AddPolicyApi(params)
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          message.success('新增授权成功');
          this.props.onSuccess();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({
      submitLoading: false,
    });
  };

  resourcePathChange = (e) => {
    e.preventDefault();
    const newVal = e.target.value;
    this.setState({
      resourcePathRadio: newVal,
    });
    if (newVal !== 'CUSTOM') {
      this.formRef.current.resetFields(['resource']);
    }
  };

  checkResourceInput = (rule, value) => {
    const { resourcePathRadio } = this.state;
    if (resourcePathRadio === 'CUSTOM') {
      if (!value) {
        return Promise.reject('请输入授权资源');
      }
    }
    return Promise.resolve();
  };

  render() {
    const { actionType, submitLoading, defaultResourcePath, resourcePathRadio, bucketInfo } = this.state;
    return (
      <Drawer
        width={620}
        placement="right"
        closable
        maskClosable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        className="oss-drawer"
        title="新增授权"
      >
        <Form
          {...formItemLayout}
          ref={this.formRef}
          onFinish={this.addAuthSubmit}
          hideRequiredMark
          initialValues={{ actionType, resourcePathRadio: defaultResourcePath }}
        >
          <Form.Item label="授权资源" name="resourcePathRadio">
            <Radio.Group onChange={this.resourcePathChange}>
              <Radio.Button value={defaultResourcePath}>整个 Bucket</Radio.Button>
              <Radio.Button value="CUSTOM">指定资源</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="resource"
            rules={[
              { validator: this.checkResourceInput },
            ]}
            label={(
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
                  <QuestionCircleOutlined style={{ margin: '0 5px' }} />
                </Tooltip>
              </span>
            )}
          >
            <div>
              {
                resourcePathRadio === defaultResourcePath ? (
                  <span>{defaultResourcePath}</span>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>{`${bucketInfo.name}/`}</span>
                    <div style={{
                      marginLeft: '8px',
                      width: '100%',
                    }}
                    >
                      <Input placeholder="资源路径" />
                    </div>
                  </div>
                )
              }
            </div>
          </Form.Item>
          <Form.Item
            name="principal"
            rules={[{
              required: true,
              message: '请输入授权用户!',
            }]}
            label={(
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
                  <QuestionCircleOutlined style={{ margin: '0 5px' }} />
                </Tooltip>
              </span>
            )}
          >
            <TextArea rows={4} placeholder="请输入被授权用户的用户名" />
          </Form.Item>
          <Form.Item
            name="actionType"
            label="授权操作"
            rules={[{
              required: true,
              message: '请选择授权操作!',
            }]}
          >
            <Radio.Group>
              <Radio.Button value={1}>只读</Radio.Button>
              <Radio.Button value={2}>读/写</Radio.Button>
              <Radio.Button value={3}>完全控制</Radio.Button>
              <Radio.Button value={4}>拒绝访问</Radio.Button>
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
              disabled={false}
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
