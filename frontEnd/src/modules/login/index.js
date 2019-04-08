
import React from 'react'
import { connect } from "dva";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message
} from 'antd';
import { routerRedux } from "dva/router"

const FormItem = Form.Item;


class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    // console.log(this.props)
    const { login, dispatch } = this.props
    const { test } = login
    const { getFieldDecorator } = this.props.form;
    const handleSubmit = (e) => {
      // e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

        }
        dispatch({ type: 'login/userLogin',payload: {...values}}).then((data)=>{if(data.code=='0'){localStorage.setItem('user', data.data[0].penName);
          dispatch({type:'home/querySuccess',payload:{user:{username:data.data[0].penName}}});
          dispatch(routerRedux.push('/'))} else message.error("用户名或密码错误")})
        
        // dispatch({ type: 'login/userLogin',payload: {...values}}).catch()
      });
      // localStorage.setItem('user', 'superAdmin')
      

    }
    return (
      <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItem:'center',paddingTop:"20vh"}}>
           <Form style={{width:'300px'}}>
        <FormItem>
          {getFieldDecorator('username', {
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a style={{float:'right'}} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" style={{width:'100%'}} onClick={handleSubmit}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
        </div>
    )
  }

}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
