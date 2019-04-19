import React from "react";
import { connect } from "dva";
import { Form, Icon, Input, Button, Checkbox,message } from "antd";

const FormItem = Form.Item;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmDirty: false };
  }
  render() {
    // console.log(this.props)

    const { signup,dispatch,match,history} = this.props;
    const { test } = signup;
    const { getFieldDecorator } = this.props.form;
    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          dispatch({type:'signup/userSignup',payload: {...values}}).then((data)=>{
            if(data.code==0){
              message.success("注册成功，请登录！");
              history.push(`/login`);
            }else{
              message.error(data.msg)
            }  
            
          })
        }
      });
    };
    const compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入的密码不一致！");
      } else {
        callback();
      }
    };

    const validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    };
    const handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItem: "center",
          paddingTop: "20vh"
        }}
      >
        <Form style={{ width: "300px" }}>
          <FormItem>
            {getFieldDecorator("nickName", {
              rules: [
                { required: true, message: "用户名不能为空" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="登录昵称"
                maxLength={10}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
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
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("confirm", {
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
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              onClick={handleSubmit}
            >
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(({ signup }) => ({ signup }))(Form.create()(Signup));
