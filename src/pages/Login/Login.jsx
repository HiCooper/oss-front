import React, { Component } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UserLoginApi } from '../../api/user';
import { removeAll, setToken, setUserInfo } from '../../util/auth';


export default class Login extends Component {
  static displayName = 'Login';

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = async (values) => {
    UserLoginApi(values)
      .then((res) => {
        if (res.token) {
          message.success('登录成功!');
          // 先清空缓存
          removeAll();
          setToken(res.token);
          setUserInfo(JSON.stringify(res.userInfo));
          this.props.history.push('/');
        } else {
          message.error('登录失败!');
        }
      });
  };

  render() {
    return (
      <Form onFinish={this.handleSubmit} className="form" initialValues={{ rememberMe: true }}>
        <div className="login-title">
          密码登录
        </div>
        <Form.Item
          name="username"
          rules={[{
            required: true,
            message: '请输入用户名!',
          }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: '请输入密码!',
          }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item valuePropName="checked" name="rememberMe">
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
