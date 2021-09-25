import React, { Component } from 'react';
import { Button, Form, Select, Checkbox, DatePicker, Input } from 'antd';
import Utils from '../../utils/utils';
const FormItem = Form.Item;

export default class FilterForm extends Component {
  formRef = React.createRef();
  handleFilterSubmit = () => {
    let fieldsValue = this.formRef.current.getFieldsValue();
    console.log("fieldsValue", fieldsValue);
    this.props.filterSubmit(fieldsValue);
  }

  reset = () => {
    this.formRef.current.resetFields();
  }

  initFormList = () => {
    const formList = this.props.formList;
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;
        if (item.type == '城市') {
          const city = <FormItem label="城市" key="city" name="city" initialValue="0">
            <Select
              style={{ width: 80 }}
              placeholder={placeholder}

            >
              {Utils.getOptionList([{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '2', name: '杭州' }])}

            </Select>
          </FormItem>;
          formItemList.push(city)
        } else if (item.type == '时间查询') {
          const begin_time = <FormItem label="订单时间" key="begin_time" name="begin_time">
            <DatePicker name="begin_time" showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
          </FormItem>;
          formItemList.push(begin_time)
          const end_time = <FormItem label="~" colon={false} key="end_time" name="end_time">
            <DatePicker name="end_time" showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
          </FormItem>;
          formItemList.push(end_time)
        } else if (item.type == 'INPUT') {
          const INPUT = <FormItem label={label} key={field} name={field} initialValue={initialValue} ref={this.formRef}>
            <Input type="text" placeholder={placeholder} />
          </FormItem>;
          formItemList.push(INPUT)
        } else if (item.type == 'SELECT') {
          const SELECT = <FormItem label={label} key={field} name={field} initialValue={initialValue}>
            <Select
              style={{ width: width }}
              placeholder={placeholder}

            >
              {Utils.getOptionList(item.list)}

            </Select>
          </FormItem>;
          formItemList.push(SELECT)
        } else if (item.type == 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label} key={field} name={field} valuePropName='checked' initialValue={initialValue}  >
            <Checkbox>
              {label}
            </Checkbox>
          </FormItem >;
          formItemList.push(CHECKBOX)
        } else if (item.type == 'DATE') {
          const DateM = <FormItem label={label} key={field} name={field}  >
            <DatePicker name="begin_time" showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
          </FormItem >;
          formItemList.push(DateM)
        }
      })
    }
    return formItemList;
  }
  render() {
    return (
      <Form layout="inline" ref={this.formRef}>
        {this.initFormList()}
        <FormItem key="cxcz">
          <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
