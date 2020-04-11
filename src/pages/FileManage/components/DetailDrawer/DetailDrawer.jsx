import React, { Component } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Drawer, Form, InputNumber, Tooltip } from 'antd';
import './index.scss';
import { GenerateUrlWithSignedApi, GetObjectHeadApi } from '../../../../api/object';
import { getAclDesc } from '../../../../util/AclTable';
import { getCurrentBucket } from '../../../../util/Bucket';
import {getIconByFileName} from "../../../../util/stringUtils";

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
const pictureShowType = 'png, jpg, jpeg, bmg, gif, svg';
const videoShowType = 'mp4';

export default class DetailDrawer extends Component {
  static displayName = 'DetailDrawer';

  constructor(props) {
    super(props);
    const bucketInfo = getCurrentBucket();
    this.state = {
      bucketInfo,
      detailInfo: this.props.info,
      timeout: 3600,
      genTempUrlInfo: {},
      objectHeadInfo: {},
    };
  }

  onChange = async (value) => {
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
    const { detailInfo, bucketInfo } = this.state;
    const params = {
      path: detailInfo.filePath,
      bucket: bucketInfo.name,
      objectName: detailInfo.fileName,
    };
    GetObjectHeadApi(params)
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            objectHeadInfo: res.data,
          });
        }
      });
  };

  generateUrlWithSigned = () => {
    const { detailInfo, timeout, bucketInfo } = this.state;
    const path = detailInfo.filePath === '/' ? `/${detailInfo.fileName}` : `${detailInfo.filePath}/${detailInfo.fileName}`;
    const params = {
      bucket: bucketInfo.name,
      objectPath: path,
      timeout,
    };
    GenerateUrlWithSignedApi(params)
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            genTempUrlInfo: res.data,
          });
        }
      });
  };

  renderFilePreview = () => {
    const { detailInfo, genTempUrlInfo, bucketInfo } = this.state;
    if (!detailInfo.isDir && detailInfo.category && genTempUrlInfo.url) {
      const url = detailInfo.acl.startsWith('PRIVATE') || (detailInfo.acl.startsWith('EXTEND') && bucketInfo.acl.startsWith('PRIVATE')) ? `${genTempUrlInfo.url}?${genTempUrlInfo.signature}` : genTempUrlInfo.url;
      if (pictureShowType.indexOf(detailInfo.category.toLowerCase()) !== -1) {
        return (
          <img src={url} alt="文件无法预览。" />
        );
      }
      if (videoShowType.indexOf(detailInfo.category.toLowerCase()) !== -1) {
        return (
          <video controls src={url} autoPlay={false}>
            <source src={url} type="video/mp4" />
            <track default
              kind="captions"
              srcLang="en"
            />
            Sorry, your browser doesn't support embedded videos.
          </video>
        );
      }
    }
    return (
      <div style={{ textAlign: 'center' }}>
        {
          detailInfo.isDir ? (
            <i className="icon-file-m" />
          ) : (
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`#${getIconByFileName(detailInfo)}`} />
            </svg>
          )
        }
        <p>{detailInfo.fileName}</p>
      </div>
    );
  };

  render() {
    const { detailInfo, genTempUrlInfo, objectHeadInfo, bucketInfo } = this.state;
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
                this.renderFilePreview()
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
                  {
                    detailInfo.acl.startsWith('PRIVATE') || (detailInfo.acl.startsWith('EXTEND') && bucketInfo.acl.startsWith('PRIVATE')) ? (
                      <Form.Item
                        label={(
                          <span>
                            链接有效时间(s)
                            <Tooltip autoAdjustOverflow
                              arrowPointAtCenter
                              placement="topLeft"
                              title="您可以设置链接地址可访问的有效时间(1min-18h)，访问者可以在有效时间内，通过此链接访问该文件"
                            >
                              <QuestionCircleOutlined style={{ margin: '0 5px' }} />
                            </Tooltip>
                          </span>
                        )}
                        validateStatus="success"
                      >
                        <InputNumber min={60}
                          max={64800}
                          defaultValue={3600}
                          onChange={this.onChange}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    ) : null
                  }
                  <Form.Item label="URL">
                    <div className="object-url">
                      {
                        detailInfo.acl.startsWith('PUBLIC') || (detailInfo.acl.startsWith('EXTEND') && bucketInfo.acl.startsWith('PUBLIC')) ? genTempUrlInfo.url : `${genTempUrlInfo.url}?${genTempUrlInfo.signature}`
                      }
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="类型"
                    validateStatus="success"
                  >
                    {detailInfo.category}
                  </Form.Item>
                  <Form.Item
                    label="文件ACL"
                    validateStatus="success"
                  >
                    {getAclDesc(detailInfo.acl)}
                  </Form.Item>
                </div>
              ) : (
                <Form.Item
                  label="文件类型"
                  validateStatus="success"
                >
                  文件夹
                </Form.Item>
              )
            }
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
