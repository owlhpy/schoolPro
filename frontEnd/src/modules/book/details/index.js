import React from "react";
import {
  List,
  Card,
  Row,
  Col,
  Avatar,
  Tag,
  Icon,
  Button,
  Input,
  Form,
  message
} from "antd";
import { connect } from "dva";
import moment from 'moment';
import { Router, Route, Switch, Link, routerRedux, Redirect } from "dva/router";

const FormItem = Form.Item;
const { TextArea } = Input;

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookMsg: [],
      chapterMsg: {},
      userMsg: {},
      refresh: 0,
      comments:[],
      likes:0
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    let temp = window.location.pathname.split("/");
    let chapterId = temp[temp.length - 1];
    
    dispatch({
      type: "book/getChapter",
      payload: { chapterId: chapterId }
    }).then(data => {
      if (data.code == "0") {
        this.setState({
          bookMsg: data.data.bookMsg,
          chapterMsg: data.data.chapterMsg,
          userMsg: data.data.userMsg,
          comments:data.data.comments,
          likes:data.data.likes
        });
      }
    });
    console.log("chapterId", chapterId);
    // dispatch({type:'book/getComments',paylaod:{chapterId:chapterId}}).then(data=>{
    //   if(data.code=='0'){
    //     this.setState({comments:data.data})
    //   }
    // })
  }
  render() {
    const { bookMsg, chapterMsg, userMsg } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {dispatch} = this.props
    const handleSubmit = e => {
      // e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let temp = window.location.pathname.split("/");
          let chapterId = temp[temp.length - 1];
          console.log("Received values of form: ", values);
          dispatch({type:"book/saveComments",payload:{chapterId:chapterId,content:values.content}}).then(data=>{
            if(data.code=='0'){
              message.success("操作成功!")
                dispatch({type:'book/getRefresh',payload:{chapterId:chapterId,type:'comments'}}).then(data=>{
                if(data.code=='0'){
                  this.setState({comments:data.data})
                  this.props.form.setFieldsValue({content:null})
                }
              })
            }else{
              message.error(data.msg)
            }
          })
        }
        
      });
     
    };
    const gridStyle = {
      width: "10%",
      textAlign: "center"
    };
    // const {list={}} = details
    const handleLike = ()=>{
      let temp = window.location.pathname.split("/");
    let chapterId = temp[temp.length - 1];
     dispatch({
            type: "book/handleLike",
            payload: { chapterId:chapterId }
          }).then(data=>{
             if (data.code == "0") {
              message.success("成功");
              dispatch({type:'book/getRefresh',payload:{chapterId:chapterId,type:'like'}}).then(data=>{
                if(data.code=='0'){
                  this.setState({likes:data.data})
                }
              })
            } else {
              message.error(data.msg);
            }
          })
    }
    const handleOpt = type => {
      switch (type) {
        case "recommend":
          dispatch({
            type: "book/handleOpt",
            payload: { type: 1, bookId: this.state.bookMsg[0].bId }
          }).then(data => {
            if (data.code == "0") {
              message.success("成功");
            } else {
              message.error(data.msg);
            }
          });
          break;
        case "collection":
          dispatch({
            type: "book/handleOpt",
            payload: { type: 0, bookId: this.state.bookMsg[0].bId }
          }).then(data => {
            if (data.code == "0") {
              message.success("成功");
            } else {
              message.error(data.msg);
            }
          });
          break;
      }
    };

    return (
      <div>
        <Row gutter={16}>
          <Col span={18}>
            <Card
              title={
                <h1>
                  {`${chapterMsg.bookName?chapterMsg.bookName:''}——`}
                  <small>{`第${chapterMsg.num?chapterMsg.num:''}章`}</small>
                </h1>
              }
              extra={
                <div>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  {userMsg.penName?userMsg.penName:''}
                </div>
              }
              actions={[
                <div onClick={handleLike}>
                  <Icon type="heart" />
                  点赞<p>{`${this.state.likes}`}</p>
                </div>
              ]}
            >
              <h2>{chapterMsg.title?chapterMsg.title:''}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: chapterMsg.content
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <List
              size="small"
              header={
                <div>
                  目录
                  <Link
                    to={`/book/${chapterMsg.bId}`}
                    style={{ float: "right" }}
                  >
                    返回书首页
                  </Link>
                </div>
              }
              footer={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "spaceBetween"
                  }}
                >
                  <Button
                    icon="eye"
                    size="small"
                    onClick={() => handleOpt("recommend")}
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid white",
                      marginRight: "5px"
                    }}
                  >
                    点赞
                  </Button>
                  <Button
                    onClick={() => handleOpt("collection")}
                    size="small"
                    icon="star"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid white"
                    }}
                  >
                    收藏此书
                  </Button>
                </div>
              }
              bordered
              dataSource={bookMsg}
              renderItem={item => (
                <List.Item>
                  <Link to={`/book/details/${item.cId}`}>{item.title}</Link>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={18}>
            <h2>评论</h2>
            <div style={{ textAlign: "center" }}>
              <Form layout="inline">
                <FormItem>
                  {getFieldDecorator("content", {
                    rules: [{ required: true, message: '评论内容不能为空!' }],
                  })(<TextArea rows={4} cols={64} maxLength={100} />)}
                </FormItem>
                <FormItem style={{ paddingTop: 40 }}>
                  <Button onClick={handleSubmit}>提交</Button>
                </FormItem>
              </Form>
            </div>

            <List
              itemLayout="horizontal"
              dataSource={this.state.comments}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                    title={<b>{item.penName}</b>}
                    description={item.content}
                  />
                  <div>{moment().format('YYYY-MM-DD h:mm:ss',item.create_date)}</div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

// export default connect(({ details, loading }) => ({ details, loading }))()

// const Details  = ()=>{
//  return(
//    <div>
//      Details Index
//    </div>
//    )
// }

export default connect(({ book }) => ({ book }))(Form.create()(Chapter));
