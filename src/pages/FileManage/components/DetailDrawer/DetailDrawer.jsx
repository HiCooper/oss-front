import React, { Component } from 'react';
import { Drawer, Form, Icon, InputNumber, Tooltip } from 'antd';
import './index.scss';
import { GenerateUrlWithSignedApi, GetObjectHeadApi } from '../../../../api/object';
import { getAclDesc } from '../../../../util/AclTable';
import { getCurrentBucket } from '../../../../util/Bucket';
import { getIconByFileName } from '../../../../util/stringUtils';

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
const bucketInfo = getCurrentBucket();
const pictureShowType = 'png, jpg, jpeg, bmg, gif, svg';
class DetailDrawer extends Component {
  static displayName = 'DetailDrawer';

  constructor(props) {
    super(props);
    this.state = {
      detailInfo: this.props.info,
      timeout: 3600,
      genTempUrlInfo: {},
      objectHeadInfo: {},
    };
  }

  onChange = async (value) => {
    console.log('changed', value);
    await this.setState({
      timeout: value,
    });
    if (value >= 60 && value <= 64800) {
      this.generateUrlWithSigned();
    }
  };

  componentDidMount() {
    this.generateUrlWithSigned();
    this.getObjectHeadInfo();
  }

  getObjectHeadInfo = () => {
    const { detailInfo } = this.state;
    const params = {
      path: detailInfo.filePath,
      bucket: bucketInfo.name,
      objectName: detailInfo.fileName,
    };
    GetObjectHeadApi(params).then((res) => {
      if (res.msg === 'SUCCESS') {
        this.setState({
          objectHeadInfo: res.data,
        });
      }
    }).catch((e) => {
      console.error(e);
    });
  };

  generateUrlWithSigned = () => {
    const { detailInfo, timeout } = this.state;
    const params = {
      bucket: bucketInfo.name,
      objectName: detailInfo.fileName,
      timeout,
    };
    GenerateUrlWithSignedApi(params).then((res) => {
      if (res.msg === 'SUCCESS') {
        this.setState({
          genTempUrlInfo: res.data,
        });
      }
    }).catch((e) => {
      console.error(e);
    });
  };

  render() {
    const { detailInfo, genTempUrlInfo, objectHeadInfo } = this.state;
    return (
      <Drawer
        width={640}
        placement="right"
        closable
        maskClosable
        onClose={this.props.onClose}
        visible={this.props.visible}
        className="oss-drawer"
        title="详情"
      >
        <div className="oss-op-file-preview">
          <div className="preview-con">
            <div className="the-previewer-wrapper">
              {
                !detailInfo.isDir && pictureShowType.indexOf(detailInfo.category.toLowerCase()) !== -1 ? (
                  <img src={`${genTempUrlInfo.url}?${genTempUrlInfo.signature}`} alt="文件无法预览。" />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <Icon type={getIconByFileName(detailInfo)}
                      theme="filled"
                      style={{
                        color: '#ffeb3b',
                        marginRight: '8px',
                        fontSize: '200px',
                      }}
                    />
                    <p>{detailInfo.fileName}</p>
                  </div>
                )
              }
            </div>
          </div>
          <Form {...formItemLayout} className="detail-form">
            {
              !detailInfo.isDir ? (
                <div>
                  <Form.Item
                    label="文件名"
                    validateStatus="success"
                  >
                    {detailInfo.fileName}
                  </Form.Item>
                  <Form.Item
                    label="ETag"
                    validateStatus="success"
                  >
                    {objectHeadInfo.eTag}
                  </Form.Item>
                  <Form.Item
                    label={(
                      <span>
                链接有效时间
                        <Tooltip autoAdjustOverflow arrowPointAtCenter placement="topLeft" title="您可以设置链接地址可访问的有效时间(1min-18h)，访问者可以在有效时间内，通过此链接访问该文件">
                          <Icon type="question-circle-o" style={{ margin: '0 5px' }} />
                        </Tooltip>
                      </span>
                    )}
                    validateStatus="success"
                  >
                    <InputNumber min={60} max={64800} defaultValue={3600} onChange={this.onChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    label="URL"
                    validateStatus="success"
                  >
                    <div className="object-url">
                      {`${genTempUrlInfo.url}?${genTempUrlInfo.signature}`}
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="类型"
                    validateStatus="success"
                  >
                    {detailInfo.category}
                  </Form.Item>
                </div>
              ) : (
                <div>
                  <Form.Item
                    label="文件类型"
                    validateStatus="success"
                  >
                    文件夹
                  </Form.Item>
                  <Form.Item
                    label="大小"
                    validateStatus="success"
                  >
                    100M
                  </Form.Item>
                  <Form.Item
                    label="子文件"
                    validateStatus="success"
                  >
                    11项
                  </Form.Item>
                </div>
              )
            }
            <Form.Item
              label="文件ACL"
              validateStatus="success"
            >
              {getAclDesc(detailInfo.acl)}
            </Form.Item>
            <Form.Item
              label="上次修改时间"
              validateStatus="success"
            >
              {detailInfo.updateTime}
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    );
  }
}

const WrappedDetailDrawer = Form.create({ name: 'object-detail-form' })(DetailDrawer);

export default WrappedDetailDrawer;
