import React from 'react'
import { List, Card, Row, Col, Avatar, Tag, Icon, Button, Input, Form, } from "antd";
import { connect } from "dva";
import { Router, Route, Switch, Link, routerRedux, Redirect } from "dva/router";


const FormItem = Form.Item;
const { TextArea } = Input;

class Chapter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    console.log(this.props.bookmessage)
  }
  render() {
     const bookmessage = {
            bookname:"TestBook",
            bookid:1,
            chapters:[{chapternum:1,chapterid:2,chaptername:"我是第一章",writer:"hpy",desc:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"},
            {chapternum:2,chapterid:3,chaptername:"第二章是我",writer:"Jack",desc:"第二章简介简介简介第二章简介简介简介第二章简介简介简介第二章简介简介简介"}],
            collection:12,
            id:3,
            recommend:10,
            chapternum:2,
            img:"one.png"

        } 
    const { getFieldDecorator } = this.props.form;
      const handleSubmit = (e) => {
      // e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

        }
        // dispatch({ type: 'login/userLogin',payload: {...values}}).then((data)=>{if(data.code=='0'){localStorage.setItem('user', data.data[0].name);dispatch(routerRedux.push('/'))} else message.error("用户名或密码错误")})
        
        // dispatch({ type: 'login/userLogin',payload: {...values}}).catch()
      });
      // localStorage.setItem('user', 'superAdmin')
      

    }
    const gridStyle = {
      width: '10%',
      textAlign: 'center',
    };
    // const {list={}} = details
    const list = {
      chaptername: "我是第一章的名字",
      chapternum: 1,
      chapterid: 1,
      like: 10,
      follow: 3,
      recommend: 5,
      writer: 'hpy',
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      comments: [{ writer: "Jack", content: "我觉得很好，真的好，非常好", time: '2018-10-3', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' }],
      content: "用top,left移动只是将div的左上角移到父元素的正中心，视觉上并没有使div到达中心，所以要配合transform使用。当我们在translate() 变形函数中使用百分比值时，是以这个元素自身的宽度和高度为基准进行换算和移动的。用top,left移动只是将div的左上角移到父元素的正中心，视觉上并没有使div到达中心，所以要配合transform使用。当我们在translate() 变形函数中使用百分比值时，是以这个元素自身的宽度和高度为基准进行换算和移动的。"
    }

    return (
      <div>
    		<Row gutter={16}>
    		<Col span={18}>
    		<Card 
    			title={<h1>{`${bookmessage.bookname}——`}<small>{`第${bookmessage.bookid}章`}</small></h1>}
    			extra={<div><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />{list.writer}</div>}
    			actions={[<div><Icon type="heart" />喜欢<p>{list.like}</p></div>]}
    			> 
    				<h2>{list.chaptername}</h2>
    				<p>{list.content}</p>
    		</Card>
    		</Col>
    		<Col span={6}>
    		 <List
		      size="small"
		      header={<div>目录<Link to={`/details/${bookmessage.bookid}`} style={{float:'right'}}>返回书首页</Link></div>}
		      footer={<div style={{display:'flex',flexDirection:'row',justifyContent:'spaceBetween'}}><Button icon="eye" size="small" style={{backgroundColor:'transparent',border:'1px solid white',marginRight:'5px'}}>推荐</Button><Button size="small" icon="star" style={{backgroundColor:'transparent',border:'1px solid white'}}>收藏此书</Button></div>}
		      bordered
		      dataSource={bookmessage.chapters}
		      renderItem={item => (<List.Item><Link to={`/details/chapter/${item.chapterid}`}>{item.chaptername}</Link></List.Item>)}
		    />
    		</Col>
    			
    		</Row>
    		<Row style={{marginTop:10}}>
    		<Col span={18}>
    		<h2>评论</h2>
    	   <div style={{textAlign:'center'}}>
    	   	<Form layout="inline">
            	<FormItem>

          {getFieldDecorator('comment', {
            // rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <TextArea rows={4} cols={64} />
          )}

        </FormItem>
        <FormItem style={{paddingTop:40}}>
        <Button onClick={handleSubmit}>提交</Button>
        </FormItem>
            </Form>
    	   </div>
    		
    		
    	
    		

            
    			 <List
        itemLayout="horizontal"
        dataSource={list.comments}
        renderItem={item => (
          <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href="https://ant.design">{item.writer}</a>}
                description={item.content}
              />
              <div>{item.time}</div>

          </List.Item>
        )}
      />
    		</Col>
    			

    		</Row>
    		</div>
    )
  }

}

// export default connect(({ details, loading }) => ({ details, loading }))()





// const Details  = ()=>{
// 	return(
// 		<div>
// 			Details Index
// 		</div>
// 		)
// }

export default Form.create()(Chapter);