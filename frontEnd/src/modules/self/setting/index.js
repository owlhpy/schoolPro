import React from 'react'
import { connect } from "dva";
import {
  Form, Icon, Input, Button, Checkbox,DatePicker,Row,Col,Select,message
} from 'antd';
import moment from 'moment';
moment.locale('zh-cn');


const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const { MonthPicker} = DatePicker;


class Form1 extends React.Component{
  constructor(props){
    super(props)
    this.state={isEdit:false,data:{}}
  }
  componentDidMount(){
    const {data} = this.props;
    this.setState({data:data.data})
    
  }


  render(){
    const {form,dispatch,data} = this.props
    const handleClick = ()=>{
      this.setState({isEdit:true})
    }
     const handleCancel = ()=>{
      this.setState({isEdit:false})
      form.setFieldsValue({penName:data.penName,nickName:data.nickName,gender:data.sex})
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(values.desc){
          values.desc = values.desc.trim();
        }
        
        // values.gender = parseInt(values.gender);
        dispatch({type:'selfs/saveSelfMsg',payload:values}).then(data=>{
          if(data.code=='0'){
            message.success('成功！')
          }else{
            message.error('出错！')
          }
        })
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
          {form.getFieldDecorator('nickName', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue:data.nickName
          })(
            <Input placeholder="Username" disabled={true}/>
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

         <Form.Item
          label="性别"
        >
          {form.getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
            initialValue:data.gender
          })(
            <Select
              placeholder="性别"
              disabled={this.state.isEdit?false:true}
            >
              <Option value={0} key="male">男</Option>
              <Option value={1} key="female">女</Option>
            </Select>
          )}
        </Form.Item>
        <FormItem label="个人描述">
          {form.getFieldDecorator('description', {
            initialValue:data.description
          })(
            <TextArea disabled={this.state.isEdit?false:true} placeholder="个人描述" autosize={{ minRows: 2, maxRows: 6 }} />

          )}
        </FormItem>
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
    const {form,history,dispatch} = this.props
     const handleClick = ()=>{
      this.setState({isEdit:true,confirmDirty: false})
    }
     const handleCancel = ()=>{
      this.setState({isEdit:false})
      form.setFieldsValue({newpwd:null,repwd:null})
    }
    const compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue("newpwd")) {
        callback("两次输入的密码不一致！");
      } else {
        callback();
      }
    };

    const validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(["repwd"], { force: true });
      }
      callback();
    };
    const handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
         dispatch({type:'selfs/editPwd',payload:values}).then(data=>{
          if(data.code=='0'){
            message.success('成功！请重新登录')
            dispatch({type:'selfs/logout'});
            history.push("/login")
          }else{
            message.error('出错！')
          }
        })

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
      
         <FormItem>
            {form.getFieldDecorator("newpwd", {
              rules: [
                { required: true, message: "密码不能为空" },
                {
                  validator: validateToNextPassword
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
                disabled={this.state.isEdit?false:true}
              />
            )}
          </FormItem>
          <FormItem>
            {form.getFieldDecorator("repwd", {
              rules: [
                { required: true, message: "密码不能为空" },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                onBlur={handleConfirmBlur}
                placeholder="确认密码"
                disabled={this.state.isEdit?false:true}
              />
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
    this.state={data:{}}
	}
   componentDidMount(){
    const {dispatch} = this.props;

    console.log('dispatch',dispatch)
    dispatch({type:'selfs/getSelfMsg'}).then(data=>{
      if(data.code=='0'){
        this.setState({data:data.data})
      }
    })
  }

    render(){
      const {dispatch,history} = this.props
     
         	return(
    	 <div>
         <WrapperFormMsg dispatch={dispatch} data={this.state.data} />
         <WrapperFormPwd dispatch={dispatch} history={history}/> 
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

export default connect(({selfs})=>({selfs}))(Setting)