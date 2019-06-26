import React, { Component } from 'react';
import { Avatar, Button, Divider, List, Skeleton } from 'antd';
import './index.scss';

const count = 3;

export default class SysNotice extends Component {
  static displayName = 'SysNotice';

  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      loading: false,
      data: [],
      list: [],
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    this.setState({
      initLoading: false,
      data: [
        {
          loading: false,
          name: 'kakaxi 2019-08-08',
        },
      ],
      list: [
        {
          loading: false,
          name: 'kakaxi 2019-08-08',
        },
      ],
    });
  };

  onLoadMore = () => {
    const { data } = this.state;
    const temp = data.concat([...new Array(count)].map(() => ({ loading: true, name: {} })));
    this.setState({
      loading: true,
      list: temp,
    });
    for (let i = 0; i < count; i++) {
      data.push({
        name: `hello${i}  2019-08-08`,
      });
    }
    this.setState(
      {
        data,
        list: data,
        loading: false,
      },
    );
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore = !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;
    return (
      <div className="sys-setting-home">
        <div className="bread">
          系统通知
        </div>
        <Divider type="horizontal" />

        <List
          className="notice-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<Button type="link">标记为已读</Button>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
