import React, { Component } from 'react';
import './index.scss';
import { Button, Form, Input, message, Modal, Popconfirm, Radio, Switch } from 'antd';
import { getAclDesc } from '../../util/AclTable';
import { DeleteBucketApi, SetBucketAclApi } from '../../api/bucket';
import { getCurrentBucket, setCurrentBucketInfo } from '../../util/Bucket';


const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    s: { span: 5 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    s: { span: 16 },
    sm: { span: 16 },
  },
};

const confirm = Modal.confirm;
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
  PUBLIC_READ_WRITE:
  <span style={{
    color: 'red',
    fontSize: '12px',
  }}
  >
公共读写：所有人都可以对文件进行读写操作。
  </span>,
};


class Settings extends Component {
  static displayName = 'Settings';

  constructor(props) {
    super(props);
    const bucketInfo = getCurrentBucket();
    this.state = {
      bucketInfo,
      aclDefault: bucketInfo.acl,
      acl: bucketInfo.acl,
      aclMessage: ACLMessageTable.PRIVATE,
      defaultReferer: '',
      referer: '',
      defaultAllowEmpty: true,
      allowEmpty: true,
      editStatus: {
        acl: false,
        referer: false,
      },
    };
  }

  bucketAclChangeSubmit = (e) => {
    e.preventDefault();
    const { acl, aclDefault, bucketInfo, editStatus } = this.state;
    if (acl !== aclDefault) {
      SetBucketAclApi({
        acl,
        bucket: bucketInfo.name,
      })
        .then((res) => {
          if (res.msg === 'SUCCESS') {
            message.success('操作成功');
            editStatus.acl = false;
            bucketInfo.acl = acl;
            setCurrentBucketInfo(JSON.stringify(bucketInfo));
            this.setState({
              editStatus,
              bucketInfo,
              aclDefault: acl,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  bucketRefererChangeSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  doEdit = (id, e) => {
    e.preventDefault();
    const { editStatus } = this.state;
    editStatus[id] = !editStatus[id];
    this.setState({
      editStatus,
    });
    if (!editStatus[id]) {
      this.resetDefaultValue(id);
    }
  };

  // 重置 默认值
  resetDefaultValue = (id) => {
    const { bucketInfo, defaultReferer, defaultAllowEmpty } = this.state;
    if (id === 'acl') {
      this.setState({
        acl: bucketInfo.acl,
      });
    } else if (id === 'referer') {
      this.setState({
        referer: defaultReferer,
        allowEmpty: defaultAllowEmpty,
      });
    }
  };

  refererAllowEmptyChange = (checked) => {
    this.setState({
      allowEmpty: checked,
    });
  };

  refererInputChange = (e) => {
    this.setState({
      referer: e.target.value,
    });
  };

  showAclPublicWarning = (e) => {
    const value = e.target.value;
    if (value === 'PRIVATE') {
      this.aclChange(value);
      return;
    }
    let msg = '尊敬的客户您好，公共读（public-read） 权限可以不通过身份验证直接读取您 Bucket 中的数据，安全风险高，为确保您的数据安全，不推荐此配置，建议您选择私有（private）.';
    if (value === 'PUBLIC_READ_WRITE') {
      msg = '尊敬的客户您好，公共读写（public-read-write） 权限可以不通过身份验证直接读取您 Bucket 中的数据，安全风险高，为确保您的数据安全，不推荐此配置，建议您选择私有（private）。';
    }
    const thisAlias = this;
    confirm({
      centered: true,
      content: msg,
      okText: '继续修改',
      cancelText: '选择私有',
      onOk() {
        thisAlias.aclChange(value);
      },
      onCancel() {
        thisAlias.aclChange('PRIVATE');
      },
    });
  };

  aclChange = (value) => {
    this.setState({
      aclMessage: ACLMessageTable[value],
      acl: value,
    });
  };

  confirmDelete = () => {
    const { bucketInfo } = this.state;
    DeleteBucketApi({ bucket: bucketInfo.name })
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          message.success('删除成功');
          this.props.history.push('/');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  cancelDelete = () => {
    message.info('取消删除');
  };

  render() {
    const { aclDefault, acl, editStatus, aclMessage, defaultReferer, referer, defaultAllowEmpty, allowEmpty } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oss-pg-bucket-setting">
        <div className="oss-rc-sections">
          <article className="the-article">
            <section className="a-section" id="acl">
              <header className="section-header">读写权限</header>
              <div className="form">
                <Form {...formItemLayout} onSubmit={this.bucketAclChangeSubmit}>
                  <Form.Item validateStatus="success" wrapperCol={{ span: 16, offset: 5 }} colon={false}>
                    <span className="help-msg">OSS ACL 提供 Bucket 级别的权限访问控制</span>
                  </Form.Item>
                  {
                    editStatus.acl ? (
                      <div>
                        <Form.Item
                          colon={false}
                          label="Bucket ACL"
                          help={aclMessage}
                        >
                          <Radio.Group defaultValue={aclDefault} value={acl} onChange={this.showAclPublicWarning}>
                            <Radio.Button value="PRIVATE">私有</Radio.Button>
                            <Radio.Button value="PUBLIC_READ">公共读</Radio.Button>
                            <Radio.Button value="PUBLIC_READ_WRITE">公共读写</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item validateStatus="success" wrapperCol={{ span: 16, offset: 5 }} colon={false}>
                          <div className="form-btn">
                            <Button
                              type="normal"
                              htmlType="submit"
                              style={{
                                marginRight: 8,
                              }}
                              disabled={acl === aclDefault}
                            >
                              保存
                            </Button>
                            <Button onClick={e => this.doEdit('acl', e)}>
                              取消
                            </Button>
                          </div>
                        </Form.Item>
                      </div>
                    ) : (
                      <div>
                        <Form.Item colon={false} label="Bucket ACL">
                          <span>{getAclDesc(acl)}</span>
                        </Form.Item>
                        <Form.Item colon={false} wrapperCol={{ span: 16, offset: 5 }}>
                          <Button type="normal" onClick={e => this.doEdit('acl', e)}>
                            设置
                          </Button>
                        </Form.Item>
                      </div>
                    )
                  }
                </Form>
              </div>
            </section>

            <section className="a-section" id="referer">
              <header className="section-header">防盗链</header>
              <div className="form">
                <Form {...formItemLayout} onSubmit={this.bucketRefererChangeSubmit}>
                  <Form.Item validateStatus="success" wrapperCol={{ span: 16, offset: 5 }} colon={false}>
                    <span className="help-msg">OSS 提供 HTTP Referer 白名单配置，用于防止盗链</span>
                  </Form.Item>
                  {
                    editStatus.referer ? (
                      <div>
                        <Form.Item
                          colon={false}
                          label="Referer"
                        >
                          {
                            getFieldDecorator('referer', {
                              initialValue: defaultReferer,
                            })(
                              <TextArea onChange={this.refererInputChange}
                                placeholder="Referer 通常为 URL 地址，支持通配符「?」和「*」，多个 referer 以换行分隔。"
                              />,
                            )
                          }
                        </Form.Item>
                        <Form.Item
                          colon={false}
                          label="允许空 Referer"
                        >
                          {
                            getFieldDecorator('allowEmpty', {
                              initialValue: defaultAllowEmpty,
                            })(
                              <Switch checked={allowEmpty} onChange={this.refererAllowEmptyChange} />,
                            )
                          }
                        </Form.Item>
                        <Form.Item validateStatus="success" wrapperCol={{ span: 16, offset: 5 }} colon={false}>
                          <div className="form-btn">
                            <Button
                              type="normal"
                              htmlType="submit"
                              style={{
                                marginRight: 8,
                              }}
                              disabled={allowEmpty === defaultAllowEmpty && referer === defaultReferer}
                            >
                              保存
                            </Button>
                            <Button onClick={e => this.doEdit('referer', e)}>
                              取消
                            </Button>
                          </div>
                        </Form.Item>
                      </div>
                    ) : (
                      <div>
                        <Form.Item colon={false} label="Referer">
                          <span>未设置</span>
                        </Form.Item>
                        <Form.Item colon={false} label="允许空 Referer">
                          <span>{allowEmpty ? '允许' : '不允许'}</span>
                        </Form.Item>
                        <Form.Item colon={false} label="  ">
                          <Button type="normal" onClick={e => this.doEdit('referer', e)}>
                            设置
                          </Button>
                        </Form.Item>
                      </div>
                    )
                  }
                </Form>
              </div>
            </section>

            <section className="a-section" id="delete-bucket">
              <header className="section-header">Bucket 管理</header>
              <div className="form">
                <Form {...formItemLayout}>
                  <Form.Item validateStatus="success" wrapperCol={{ span: 16, offset: 5 }} colon={false}>
                    <span className="help-msg">可以对 Bucket 进行删除操作，Bucket 删除后将不可恢复，请您谨慎操作</span>
                  </Form.Item>
                  <Form.Item colon={false} wrapperCol={{ span: 16, offset: 5 }}>
                    <Popconfirm
                      title="删除 Bucket 后将不可恢复，确定要删除该 Bucket 吗？"
                      onConfirm={this.confirmDelete}
                      onCancel={this.cancelDelete}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="danger">删除 Bucket</Button>
                    </Popconfirm>
                  </Form.Item>
                </Form>
              </div>
            </section>
          </article>
        </div>
      </div>
    );
  }
}


const WrappedSettings = Form.create({ name: 'normal_login' })(Settings);

export default WrappedSettings;
