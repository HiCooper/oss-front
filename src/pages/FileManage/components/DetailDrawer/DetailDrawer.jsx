import React, { Component } from 'react';
import { Drawer, Form } from 'antd';
import './index.scss';
import { GetPicUrl } from '../../../../api/object';
import { getAclDesc } from '../../../../util/AclTable';

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
const pictureShowType = 'png, jpg, jpeg, bmg, gif, svg';
class DetailDrawer extends Component {
  static displayName = 'DetailDrawer';

  constructor(props) {
    super(props);
    this.state = {
      detailInfo: this.props.info,
    };
  }

  render() {
    const { detailInfo } = this.state;
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
                pictureShowType.indexOf(detailInfo.category.toLowerCase()) !== -1 ? (
                  <img src={`${GetPicUrl}/${detailInfo.fileName}`} alt="文件无法预览。" />
                ) : <span>文件无法预览。</span>
              }
            </div>
          </div>
          <Form {...formItemLayout} className="detail-form">
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
              未获取
            </Form.Item>
            <Form.Item
              label="URL"
              validateStatus="success"
            >
              <div className="object-url">
                {`${GetPicUrl}/${detailInfo.fileName}`}
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
          </Form>
        </div>
      </Drawer>
    );
  }
}

const WrappedDetailDrawer = Form.create({ name: 'object-detail-form' })(DetailDrawer);

export default WrappedDetailDrawer;
