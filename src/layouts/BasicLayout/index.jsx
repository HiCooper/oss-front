import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Icon, Input, Layout, Menu, message, Popover, Row } from 'antd';
import MainRouter from './MainRouter';
import { sideMenuConfig } from '../../menuConfig';
import './index.scss';
import AddBucketDrawer from '../../pages/AddBucketDrawer';
import LoginHeader from '../components/LoginHeader';
import { ListBucketApi } from '../../api/bucket';
import { getUserInfo } from '../../util/auth';
import { setCurrentBucketInfo } from '../../util/Bucket';

const { Content, Sider } = Layout;
const Search = Input.Search;

class BasicLayout extends Component {
  static displayName = 'BasicLayout';

  userInfo = getUserInfo() ? JSON.parse(getUserInfo()) : { username: '' };

  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    const base = pathname.substr(0, pathname.lastIndexOf('/'));
    this.state = {
      activateMenuPath: base,
      bucketList: [],
      visible: false,
      // bucket name
      name: '',
    };
  }

  componentDidMount() {
    const userInfo = getUserInfo();
    if (userInfo){
      this.initBucketList();
    }
  }

  componentWillReceiveProps(nextProps, nextContent) {
    const pathname = nextProps.location.pathname;
    const base = pathname.substr(0, pathname.lastIndexOf('/'));
    this.setState({
      activateMenuPath: base,
    });
  }

  // 获取 bucket 列表
  initBucketList = () => {
    const { name } = this.state;
    ListBucketApi({ name })
      .then((res) => {
        if (res.msg === 'SUCCESS') {
          this.setState({
            bucketList: res.data,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  searchBucket = async (value) => {
    await this.setState({
      name: value,
    });
    this.initBucketList();
  };

  subMenuSelect = (item) => {
    const bucketName = item.key.split('/')[2];
    const { bucketList } = this.state;
    const find = bucketList.find(i => i.name === bucketName);
    setCurrentBucketInfo(JSON.stringify(find));
    const location = this.props.location;
    if (`${item.key}/overview` !== (location.pathname + location.search)) {
      this.props.history.push(`${item.key}/overview`);
    }
  };

  renderBucketList = (item) => {
    return (
      <Menu.Item key={`/bucket/${item.name}`}>
        <Row>
          <Col span={4}>
            <span className="bucket-dot" />
          </Col>
          <Col span={20}>
            {item.name}
          </Col>
        </Row>
      </Menu.Item>
    );
  };

  renderMenuItem = (item) => {
    return (
      <Menu.Item key={item.path}>
        <Row>
          <Col span={4}>
            <Icon type={item.icon} theme="filled" />
          </Col>
          <Col span={20}>
            {item.name}
          </Col>
        </Row>
      </Menu.Item>
    );
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  flushList = async () => {
    message.loading('刷新中...', 0.5);
    this.initBucketList();
  };

  render() {
    const { activateMenuPath, bucketList, visible } = this.state;
    return (
      <Layout className="basic-layout">
        <LoginHeader />
        <Layout className="main-section">
          <Sider width={200} className="default-side">
            <Menu
              onSelect={this.subMenuSelect}
              mode="inline"
              defaultOpenKeys={['1']}
              defaultSelectedKeys={[activateMenuPath]}
              selectedKeys={[activateMenuPath]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
            >
              {
                sideMenuConfig.map(this.renderMenuItem)
              }
              <div className="operate">
                <Search
                  placeholder="搜索存储空间"
                  onSearch={value => this.searchBucket(value)}
                  style={{ width: 130 }}
                />
              </div>
              <div className="bucket-list-title">
                <span>存储空间</span>
                <div>
                  <Popover placement="top" content="新建Bucket" trigger="hover">
                    <Icon type="plus"
                      style={{
                        cursor: 'pointer',
                        marginRight: '8px',
                      }}
                      onClick={this.showDrawer}
                    />
                  </Popover>
                  <AddBucketDrawer onClose={this.onClose} visible={visible} onSuccess={this.initBucketList} />
                  <Popover placement="top" content="刷新" trigger="hover">
                    <Icon type="sync" style={{ cursor: 'pointer' }} onClick={this.flushList} />
                  </Popover>
                </div>
              </div>
              {
                bucketList.map(this.renderBucketList)
              }
            </Menu>
          </Sider>
          <Layout className="main-content">
            <Content className="content">
              <MainRouter />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
