import React, { Component } from 'react';
import { Alert, Button, Drawer, Form, Input } from 'antd';
import './index.scss';
import { getCurrentBucket } from '../../../../util/Bucket';
import { CreateFolderApi } from '../../../../api/object';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    s: { span: 5 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    s: { span: 19 },
    sm: { span: 19 },
  },
};

class AddFolderDrawer extends Component {
  static displayName = 'DetailDrawer';

  constructor(props) {
    super(props);
    const bucketInfo = getCurrentBucket();
    this.state = {
      currentPath: this.props.currentPath,
      objectName: '',
      bucketInfo,
      submitLoading: false,
    };
  }

  validateFolder = (rule, value, callback) => {
    if (!value || value.trim().length < 2 || value.trim().length > 254) {
      callback(
        <span style={{
          fontSize: '12px',
          color: 'red',
        }}
        >
        2-254个字符长度
        </span>,
      );
      return;
    }
    if (value.indexOf('//') !== -1) {
      callback(
        <span style={{
          fontSize: '12px',
          color: 'red',
        }}
        >
        目录路径不允许出现连续的「/」
        </span>,
      );
      return;
    }
    if (value.startsWith('/') || value.startsWith('\\') || value.endsWith('/') || value.endsWith('\\')) {
      callback(
        <span style={{
          fontSize: '12px',
          color: 'red',
        }}
        >
        文件名不能以
          <code>/</code>
        或
          <code>\</code>
        开头和结尾。
        </span>,
      );
      return;
    }
    if (!/^[^/]((?!\/\/)[a-zA-Z0-9/\u4E00-\u9FA5]+)*[^/]$/.test(value)) {
      callback(
        <span
          style={{
            fontSize: '12px',
            color: 'red',
          }}
        >
          目录仅支持数字字母中文和
          <code>/</code>
          字符
        </span>
      );
    }
    this.setState({
      objectName: value,
    });
    callback();
  };

  createFolderSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitLoading: true,
    });
    const { bucketInfo, currentPath } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          bucket: bucketInfo.name,
          folder: currentPath === '/' ? values.objectName : `${currentPath.substr(1)}/${values.objectName}`,
        };
        CreateFolderApi(params)
          .then((res) => {
            if (res.msg === 'SUCCESS') {
              this.props.onSuccess();
              this.props.onClose();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
    this.setState({
      submitLoading: false,
    });
  };

  render() {
    const { submitLoading, objectName } = this.state;
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
        title="详情"
      >
        <Form {...formItemLayout} className="add-folder-form" onSubmit={this.createFolderSubmit}>
          <Form.Item
            label="目录名"
            extra={folderHelpMessage}
          >
            {
              getFieldDecorator('objectName', {
                rules: [
                  {
                    validator: this.validateFolder,
                  },
                ],
                initialValue: objectName,
              })(
                <Input placeholder="相对当前目录" suffix={`${objectName.length}/254`} />,
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
              disabled={!!getFieldError('objectName') || !objectName}
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

const folderHelpMessage = (
  <div className="upload-help-info">
    <div className="oss-intl-lines">
      <p>目录命名规范：</p>
      <ol>
        <li>不允许使用表情符，请使用符合要求的 UTF-8 字符</li>
        <li>
          <code>/</code>
          用于分割路径，可快速创建子目录，但不要以
          <code>/</code>
          或
          <code>\</code>
          打头，不要出现连续的
          <code>/</code>
        </li>
        <li>
          不允许出现名为
          <code>..</code>
          的子目录
        </li>
        <li>总长度控制在 1-254 个字符</li>
      </ol>
    </div>
    <Alert message="注意，Bucket 下若存在同名目录，将会忽略。" type="warning" showIcon />
  </div>
);

const WrappedAddFolderDrawer = Form.create({ name: 'add-folder-form' })(AddFolderDrawer);

export default WrappedAddFolderDrawer;
