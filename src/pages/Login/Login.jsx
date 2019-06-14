import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link } from 'react-router-dom';
import { UserLoginApi } from '../../api/user';
import { removeAll, setToken, setUserInfo } from '../../util/auth';


class Login extends Component {
  static displayName = 'Login';

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        UserLoginApi(values).then((res) => {
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
        }).catch((error) => {
          message.error('登录失败!');
          console.error(error);
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="form">
        <div className="login-title">
          密码登录
        </div>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rememberMe', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          <Link className="login-form-forgot" to="">
            忘记密码
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <Link to=""> 立即注册!</Link>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
