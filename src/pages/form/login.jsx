import React, { Component } from 'react';
import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
export default class FormLogin extends Component {

  formRef = React.createRef();

  getValidateValues = async () => {
    const form = this.formRef.current;//获取到所以属性值
    const userInfo = this.formRef.current.getFieldsValue();
    // 使用 validateFields 获取验证后字段值
    try {
      const values = await form.validateFields(['userName', 'userPwd'])
      console.log(values)
      message.success(`${userInfo.userName} 恭喜你，通过本次学习，你的密码是${userInfo.userPwd}`);
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{ marginTop: 10 }}>
          <Form style={{ width: 300 }} ref={this.formRef} onFinish={this.onFinish}>
            <FormItem name="userName" initialValue=""
              rules={[
                { required: true, message: '用户名不能为空' },
                { min: 5, max: 10, message: '长度不在范围内' },
                { pattern: new RegExp('^\\w+$', 'g'), message: '用户名必须为英文字母或数字' }
              ]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </FormItem>
            <FormItem name="userPwd" initialValue="123456" rules={[{}]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem name="remember" initialValue={true} valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
              <a href="#" style={{ float: 'right' }}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.getValidateValues}>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
