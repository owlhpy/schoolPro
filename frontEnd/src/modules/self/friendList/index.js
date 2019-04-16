import React from "react";
import { List, Avatar, Button, Row, Col, Form, Input, Select,message } from "antd";
import { connect } from "dva";
import { routerRedux } from "dva/router";

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isInvite: false,
      isShowContent: false,
      isLiveMsg: false,
      isShowInvite: false,
      user: null,
      inviteBooks:[],
      chapterNum:null
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: "selfs/getFriends" }).then(data => {
      if (data.code == 0) {
        this.setState({ dataSource: data.data });
      }
    });
  }

  render() {
    const { dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const handleClick = key => {
      if (key == "ok") {
        this.setState({ isCheck: 1 });
      } else {
        this.setState({ isCheck: 2 });
      }
    };
    const {inviteBooks} = this.state;
    const handleSelect = (value)=>{
      dispatch({type:'selfs/getIBChapter',payload:{chapterId:value}}).then((data)=> {
        if(data.code=='0'){
          this.setState({chapterNum:data.data.chapterNum+1})
        }else{
          message.error("出错")
        }
        
      })
    }
    const handleContent = e => {
       e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({type:'selfs/sendMsg',payload:values})
      }
    });
    };
    const handleInvite = e => {
       e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({type:'selfs/sendInvite',payload:values}).then(data=>{
          if(data.code=='0'){
            message.success("成功！")
          }else{
            message.error(data.msg);
          }
        })
      }
    });
    };
    const { TextArea } = Input;
    return (
      <div>
        <Row gutter={32}>
          <Col span={18}>
            <List
              itemLayout="horizontal"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 4,
                size: "small"
              }}
              dataSource={this.state.dataSource}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      onClick={e => {
                        this.setState({
                          isShowInvite: true,
                          isShowContent: false,
                          user: {penName:item.penName,receiveId:item.id}
                        });
                      dispatch({type:'selfs/getInviteBooks'}).then(data=>{
                        if(data.code=='0'){
                          this.setState({inviteBooks:data.data})
                          if(data.data.length>=1){
                            this.setState({chapterNum:data.data[0].chapterNum+1})
                          }
                        }
                      })
                      }}
                    >
                      邀请写作
                    </Button>,
                    <Button
                      onClick={e => {
                        this.setState({
                          isShowContent: true,
                          isShowInvite: false,
                          user: {penName:item.penName,receiveId:item.id,chapterNum:item.chapterNum+1}
                        });
                      }}
                    >
                      留言
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.penName}</a>}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={6}>
            {this.state.isShowContent || this.state.isShowInvite ? (
              <h4>To:{this.state.user.penName}</h4>
            ) : (
              ""
            )}
            {this.state.isShowContent ? (
              <Form style={{ width: "300px" }} onSubmit={handleContent}>
                <Form.Item style={{display:'none'}}>
                  {getFieldDecorator("receiveId", {
                    initialValue:this.state.user.receiveId
                  })(<Input hidden={true} />)}
                </Form.Item>
                <Form.Item label="留言内容">
                  {getFieldDecorator("content", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(<TextArea rows={4} />)}
                </Form.Item>
                <Form.Item style={{ paddingLeft: "50%" }}>
                  <Button
                    size="small"
                    onClick={() => {
                      this.setState({ isShowContent: false, user: null });
                      dispatch({ type: "selfs/getInviteBooks" }).then(data => {
                        if (data.code == "0") {
                          data.data.length>0?this.setState({inviteBooks:data.data}):this.setState({inviteBooks:[]})
                          
                        }
                      });
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    取消
                  </Button>
                  <Button size="small" type="primary" htmlType="submit" onClick={handleContent}>
                    留言
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              ""
            )}
            {this.state.isShowInvite&&this.state.inviteBooks.length>0&& (
              <Form style={{ width: "300px" }} onSubmit={handleInvite}>
                <Form.Item style={{display:'none'}}>
                  {getFieldDecorator("receiveId", {
                    initialValue:this.state.user.receiveId
                  })(<Input hidden={true} />)}
                </Form.Item>
                <Form.Item style={{display:'none'}}>
                  {getFieldDecorator("chapterNum", {
                    initialValue:this.state.user.chapterNum
                  })(<Input hidden={true} />)}
                </Form.Item>
                <Form.Item label="选择书本">
                  {getFieldDecorator("bookId", {
                    rules: [
                      { required: true, message: "Please input your username!" },                
                    ],
                    initialValue:inviteBooks.length>0?inviteBooks[0].id:null
                  })(
                    <Select
                    onSelect = {handleSelect}
                    placeholder="暂无书可选"
                    disabled={this.state.inviteBooks.length>0?false:true}
                    >
                      {this.state.inviteBooks.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>{`《${
                            item.bookName
                          }》`}</Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="章节">
                  {getFieldDecorator("chapterNum", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ],
                    initialValue:this.state.chapterNum
                  })(<Input placeholder="章节" disabled />)}
                </Form.Item>
                <Form.Item style={{ paddingLeft: "50%" }}>
                  <Button
                    onClick={() => {
                      this.setState({ isShowInvite: false, user: null });
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    取消
                  </Button>
                  <Button type="primary" htmlType="submit">邀请</Button>
                </Form.Item>
              </Form>
            ) }
            {this.state.isShowInvite&&this.state.inviteBooks.length==0&&(
            "暂无书本可邀请好友进行写作！"
            )
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ selfs }) => ({ selfs }))(Form.create()(FriendList));

// class Product extends React.Component{
//  constructor(props){
//    super(props)
//  }
//  render(){
//    return(
//      <div></div>
//      )
//  }
// }
// const FriendList  = ()=>{
//  return(
//    <div>
//      FriendList Index
//    </div>
//    )
// }

// export default FriendList
