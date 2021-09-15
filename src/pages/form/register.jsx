import React, { Component } from 'react';
import moment from 'moment';
import { Button, Card, Checkbox, Form, Input, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
export default class FormRegister extends Component {
  formRef = React.createRef();
  state = {
    userImg: null,
    loading: false,
  }
  handleSubmit = () => {
    const userInfo = this.formRef.current.getFieldsValue();
    console.log(JSON.stringify(userInfo));
    message.success(`${userInfo.userName} 恭喜你，通过本次学习，你的密码是${userInfo.userPwd}`);
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  render() {
    // const normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
    //   console.log('Upload event:', e);
    //   if (Array.isArray(e)) {
    //     return e;
    //   }
    //   return e && e.fileList;
    // };
    const { loading, imageUrl } = this.state;
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 20
      }
    }
    const rowObject = { minRows: 4, maxRows: 6 };
    return (
      <>
        <Card title="注册表单">
          <Form ref={this.formRef}>
            <FormItem {...formItemLayout} label="用户名" name="userName" initialValue=""
              rules={[
                { required: true, message: '用户名不能为空' }
              ]}>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem {...formItemLayout} label="密码" name="userPwd" initialValue="" rules={[{}]}>
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem {...formItemLayout} label="性别" name="sex" initialValue="1" >
              <RadioGroup>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="年龄" name="age" initialValue={18} >
              <InputNumber />
            </FormItem>
            <FormItem {...formItemLayout} label="当前状态" name="state" initialValue="2" >
              <Select>
                <Option value="1">咸鱼一条</Option>
                <Option value="2">风华浪子</Option>
                <Option value="3">北大才子</Option>
                <Option value="4">阿里FE</Option>
                <Option value="5">创业者</Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="爱好" name="interest" initialValue={['2', '5']} >
              <Select mode="multiple">
                <Option value="1">游泳</Option>
                <Option value="2">跑步</Option>
                <Option value="3">踢足球</Option>
                <Option value="4">跑步</Option>
                <Option value="5">爬山</Option>
                <Option value="6">骑行</Option>
                <Option value="7">桌球</Option>
                <Option value="8">乒乓球</Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="是否已婚" name="isMarried" valuePropName="checked" initialValue={true} >
              <Switch />
            </FormItem>
            <FormItem {...formItemLayout} label="生日" name="birthday" initialValue={moment('2020-08-08 12:23:33')} >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </FormItem>
            <FormItem {...formItemLayout} label="联系地址" name="address" initialValue="杭州市飞天园区">
              <TextArea autoSize={rowObject} />
            </FormItem>
            <FormItem {...formItemLayout} label="早起时间" name="time">
              <TimePicker />
            </FormItem>
            <FormItem {...formItemLayout} label="头像" name="userImg" >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}

              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem {...offsetLayout}>
              <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </>
    );
  }
}

