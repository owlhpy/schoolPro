import React from 'react'
import { connect } from "dva";
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';


const FormItem = Form.Item;


class Signup extends React.Component{
	constructor(props){
		super(props)
	}
    render(){
    	// console.log(this.props)
    	const {signup} = this.props
    	const {test} = signup
    	const { getFieldDecorator } = this.props.form;
      const handleSubmit = (e)=>{
        e.preventDefault();
           this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
      }
    	return(
    		<div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItem:'center',paddingTop:"20vh"}}>
    			 <Form style={{width:'300px'}}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
         <FormItem>
          {getFieldDecorator('repassword', {
            rules: [{ required: true, message: 'Please re-input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a style={{float:'right'}} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" style={{width:'100%'}} onClick = {handleSubmit}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    		</div>
    		)
    }

}

export default connect(({signup})=>({signup}))(Form.create()(Signup))