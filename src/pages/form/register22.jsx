import {Card,Form,Input, Radio,InputNumber,Select,Switch,DatePicker,message,TimePicker,Upload, Checkbox, Button} from 'antd'
import React, { Component } from 'react'
import moment from 'moment';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
export default class Regsiter extends Component {
    state={
        loading: false,
    }
    handleSubmit=(values)=>{
        console.log('Received values of form: ', values);
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
    beforeUpload(file) {
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
            // console.log(info.file.originFileObj);
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
        const formItemLayout={
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            },
        };
        const offsetLayout={
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            },
        };
        const { Option } = Select;
        const { TextArea } = Input;
        const dateFormat = 'YYYY/MM/DD';
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal" 
                    autoComplete="off" 
                    initialValues={{use:true,switch:true,gender:"1",age:"18",state:"1",like:["1"],address:"北京海定区奥林匹克公园",birthday:moment('2021/09/07', 'YYYY/MM/DD'),time:moment('00:00:00', 'HH:mm:ss')}}
                    onFinish={this.handleSubmit}
                    >
                        <Form.Item {...formItemLayout}
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                    {
                                        max:10,
                                        message: '长度超出',
                                    },
                                ]}
                            >
                                <Input placeholder="请输入用户名"/>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        pattern:/^\w+$/g,
                                        message:'密码必须为数字和字母组合'
                                    }
                                ]}
                            >
                                <Input.Password placeholder="请输入密码"/>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Gender"
                                name="gender"
                            >
                                <Radio.Group name="radiogroup" >
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Age"
                                name="age"
                            >
                                <InputNumber min={1} max={100} />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="当前状态"
                                name="state"
                            >
                                <Select >
                                    <Option value="1">咸鱼一条</Option>
                                    <Option value="2">风华浪子</Option>
                                    <Option value="3">北大才子</Option>
                                    <Option value="4">创业者</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="爱好"
                                name="like"
                            >
                                <Select  mode="multiple">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">打篮球</Option>
                                    <Option value="3">踢足球</Option>
                                    <Option value="4">跑步</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Switch"
                                name="switch"
                                valuePropName="checked" 
                            >
                                <Switch/>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="生日"
                                name="birthday"
                            >
                                {/* <Space direction="vertical">
                                    
                                </Space> */}
                                <DatePicker format={dateFormat} />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Address"
                                name="address"
                            >
                                <TextArea showCount maxLength={100} />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="早起时间"
                                name="time"
                            >
                                <TimePicker  />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="UpLoad"
                                name="upload"
                                // valuePropName="fileList"
                            >
                               {
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
                            }
                            </Form.Item>
                            <Form.Item
                                {...offsetLayout}
                                name="use"
                                valuePropName="checked" 
                            >
                                <Checkbox >我已阅读过<a href="1">慕课协议</a></Checkbox>
                            </Form.Item>
                            <Form.Item
                                {...offsetLayout}
                                name="submit"
                            >
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
