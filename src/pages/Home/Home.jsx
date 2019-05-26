import React, { Component } from 'react';
import { Button, Radio, Icon, Input } from 'antd';
import './index.scss';

const Search = Input.Search;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header-line">
        <div className="left-btn-group">
          <Button type="primary" icon="upload" style={{ marginRight: '10px' }}>上传</Button>
          <Button icon="folder-add" style={{ marginRight: '10px' }}>新建文件夹</Button>
          <Radio.Group>
            <Radio.Button>
              <Icon type="download" />
              <span>下载</span>
            </Radio.Button>
            <Radio.Button>
              <Icon type="delete" />
              <span>删除</span>
            </Radio.Button>
            <Radio.Button>
              <Icon type="edit" />
              <span>重命名</span>
            </Radio.Button>
            <Radio.Button>
              <Icon type="copy" />
              <span>复制到</span>
            </Radio.Button>
            <Radio.Button>
              <Icon type="scissor" />
              <span>移动到</span>
            </Radio.Button>
          </Radio.Group>
        </div>

        <div className="right-operate">
          <Search
            placeholder="搜索您的文件"
            onSearch={value => console.log(value)}
            style={{ width: 200, marginRight: '10px' }}
          />
          <Icon type="appstore" className="vmode" />
          {/* <Icon type="bars" className="vmode" /> */}
        </div>
      </div>
    );
  }
}
