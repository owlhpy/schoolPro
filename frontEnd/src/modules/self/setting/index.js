import React from 'react'
import { connect } from "dva";
import {
  Form, Icon, Input, Button, Checkbox,DatePicker,Row,Col,Select
} from 'antd';
import moment from 'moment';
moment.locale('zh-cn');


const FormItem = Form.Item;
const { Option } = Select;

const { MonthPicker} = DatePicker;


class Form1 extends React.Component{
  constructor(props){
    super(props)
    this.state={isEdit:false}
  }


  render(){
    const {form,data} = this.props
    const handleClick = ()=>{
      this.setState({isEdit:true})
    }
     const handleCancel = ()=>{
      this.setState({isEdit:false})
      form.setFieldsValue({penName:data.penName,userName:data.nickName,birthday:moment(data.birthday, 'YYYY/MM'),gender:data.sex})
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
    const WrapperBtn = ()=>{
    if(this.state.isEdit){
      return(
        [
         <Form.Item key="1">
          <Button
          onClick={handleCancel}
          >
            取消
          </Button>
        </Form.Item>,
        <Form.Item key="2">
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
        </Form.Item>
        ]
        )
    }else{
      return(
         <Form.Item key="3">
          <Button
          onClick={handleClick}
          >
            编辑
          </Button>
        </Form.Item>
        )
    }
  }
     return(
      <div>
        
        <Row gutter={32}>

          <h2>基本信息</h2>
              <Form layout="inline" onSubmit={handleSubmit}>
        <FormItem label="昵称">
          {form.getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue:data.nickName
          })(
            <Input placeholder="Username" disabled={this.state.isEdit?false:true}/>
          )}
        </FormItem>
        <FormItem label="笔名">
          {form.getFieldDecorator('penName', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue:data.penName
          })(
            <Input placeholder="PenName" disabled={this.state.isEdit?false:true}/>
          )}
        </FormItem>
        <FormItem label="生日">
          {form.getFieldDecorator('birthday', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue:moment(data.birthday, 'YYYY/MM')
          })(
             <MonthPicker format="YYYY/MM" style={{width:'100%'}} disabled={this.state.isEdit?false:true}/>
          )}
        </FormItem>
         <Form.Item
          label="性别"
        >
          {form.getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
            initialValue:data.sex
          })(
            <Select
              placeholder="性别"
              disabled={this.state.isEdit?false:true}
            >
              <Option value="male" key="male">男</Option>
              <Option value="female" key="female">女</Option>
            </Select>
          )}
        </Form.Item>
        <WrapperBtn />

      </Form>
      
        
        </Row>
     
        </div>

    )
  }

}

const WrapperFormMsg = Form.create()(Form1);

class Form2 extends React.Component{
  constructor(props){
    super(props)
    this.state={isEdit:false}
  }
  render(){
    const {form} = this.props
     const handleClick = ()=>{
      this.setState({isEdit:true})
    }
     const handleCancel = ()=>{
      this.setState({isEdit:false})
      form.setFieldsValue({newpwd:null,repwd:null})
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
    const WrapperBtn = ()=>{
    if(this.state.isEdit){
      return(
        [
         <Form.Item key="1">
          <Button
          onClick={handleCancel}
          >
            取消
          </Button>
        </Form.Item>,
        <Form.Item key="2">
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
        </Form.Item>
        ]
        )
    }else{
      return(
         <Form.Item key="3">
          <Button
          onClick={handleClick}
          >
            编辑
          </Button>
        </Form.Item>
        )
    }
  }
     return(
      <div>
        
        <Row gutter={32} style={{marginTop:'10px'}}>

          <h2>修改密码</h2>
              <Form layout="inline" onSubmit={handleSubmit}>
        <FormItem label="新密码">
          {form.getFieldDecorator('newpwd', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input placeholder="pwd" disabled={this.state.isEdit?false:true} />
          )}
        </FormItem>
        <FormItem label="确认密码">
          {form.getFieldDecorator('repwd', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input placeholder="pwd" disabled={this.state.isEdit?false:true} />
          )}
        </FormItem>
       <WrapperBtn />

      </Form>
      
        
        </Row>
     
        </div>

    )
  }
}



const WrapperFormPwd = Form.create()(Form2);

class Setting extends React.Component{
	constructor(props){
		super(props)
	}

    render(){
    	const { getFieldDecorator } = this.props.form;
      const data1 = {sex:'female',nickName:'hpy',penName:'Owlhpy',birthday:'1997-2-20',isEdit:false}
    	return(
    	 <div>
         <WrapperFormMsg data={data1} />
         <WrapperFormPwd /> 
       </div>
    		)
    }

}

// const Setting  = ()=>{
// 	return(
// 		<div>
// 			Setting Index
// 		</div>
// 		)
// }

export default connect(({selfs})=>({selfs}))(Form.create()(Setting))