
import React from 'react'
// import '../../assets/js/config.js'
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
        dispatch({ type: 'login/userLogin',payload: {...values}}).then((data)=>{if(data.code=='0'){
          // console.log('cookie',document.cookie.__SID)S
          sessionStorage.setItem('__SID', data.data[0].nickName);
          sessionStorage.setItem('userId', data.data[0].id)
          // dispatch({type:'home/querySuccess',payload:{user:{username:data.data[0].nickName}}});
          dispatch(routerRedux.push('/'))} else message.error("用户名或密码错误")})
        
        // dispatch({ type: 'login/userLogin',payload: {...values}}).catch()
      });
      // localStorage.setItem('user', 'superAdmin')
      

    }
    return (
      <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItem:'center',paddingTop:"20vh"}}>
      <h3>登录</h3>
           <Form style={{width:'300px'}}>
        <FormItem>
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '昵称不能为空!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="登录昵称" maxLength={15} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{width:'100%'}} onClick={handleSubmit}>
            登录
          </Button>
        </FormItem>
      </Form>
        </div>
    )
  }

}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
