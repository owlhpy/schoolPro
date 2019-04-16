import React from 'react'
import { Card,List,Button,message} from 'antd';
import {Link} from 'dva/router'
import { connect } from "dva";

class Message extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    key: 'tab1',
    tab1Data:[],
    tab2Data:[],
    tab3Data:[],
    }
  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({type:'selfs/getInvitedBookMsg'}).then(data=>{
      if(data.code=='0'){
        this.setState({tab1Data:data.data});
      }
    })

  }

  render(){
    const {dispatch} = this.props
    const tabList = [{
  key: 'tab1',
  tab: '受邀',
}, {
  key: 'tab2',
  tab: '邀请回复',
},
{
  key:'tab3',
  tab:'好友添加申请'
}
];
const handleInvite = (type,bookId,chapterNum)=>{
  dispatch({type:'selfs/saveInvite',payload:{status:type,bookId:bookId,chapterNum:chapterNum}}).then((data)=>{
    if(data.code=='0'){
      message.success('成功！');
    }else{
      message.error('出错')
    }
    
  })
}

const data2 = [
{id:1,toUser:'hpy',toUserId:111,bookname:'What',chapterid:233,chapterNum:2,status:0},
{id:2,toUser:'hpy',toUserId:111,bookname:'What',chapterid:233,chapterNum:2,status:1},
{id:3,toUser:'hpy',toUserId:111,bookname:'What',chapterid:233,chapterNum:2,status:2},

]
const data3 = [
{id:1,toUser:'hpy',sendId:111,bookname:'What',chapterid:233,chapterNum:2,status:0},
{id:2,toUser:'hpy',sendId:111,bookname:'What',chapterid:233,chapterNum:2,status:1},
{id:3,toUser:'hpy',sendId:111,bookname:'What',chapterid:233,chapterNum:2,status:2},

]
const switchStatus = (status)=>{
  switch(status){
    case 0:
    return <span style={{color:'blue'}}>待处理</span> 
    break;
    case 1:
    return <span style={{color:'green'}}>接受</span> 
    break;
    case 2:
    return <span style={{color:'red'}}>拒绝</span> 
    break;
  }
}
const contentList = {
  tab1: 
  <List 
   dataSource={this.state.tab1Data}
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
   grid={{ gutter: 32, column: 2}}
   renderItem={item => (<List.Item style={{display:'flex',justifyContent:'space-between'}}>
    <span>{item.penName}邀请您参与<Link to="/">《{item.bookName}》</Link>第{item.chapterNum}章的续写</span>
   <span style={{display:'inline-block',float:'right'}}>
   {
    item.status!=0?<span>{item.status==1?"已接受":"已拒绝"}</span>:<span><Button style={{marginRight:'10px'}} size="small" onClick={()=>handleInvite(2,item.bookId,item.chapterNum)}>拒绝</Button>
    <Button type="primary" size="small" onClick={()=>handleInvite(1,item.bookId,item.chapterNum)}>接受</Button></span>
   }
   
    </span>
    
    
    </List.Item>)
}
  />
  ,
  tab2:<List 
   dataSource={this.state.tab2Data}
   grid={{ gutter: 32, column: 2}}
   renderItem={item => (<List.Item style={{display:'flex',justifyContent:'space-between'}}>
    <span>邀请{item.penName}参与<Link to="/">《{item.bookName}》</Link>第{item.num}章的续写</span>
    <span style={{display:'inline-block',float:'right'}}>状态：{switchStatus(item.status)}</span></List.Item>)}
  />,
   tab3: 
  <List 
   dataSource={data3}
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
   grid={{ gutter: 32, column: 2}}
   renderItem={item => (<List.Item style={{display:'flex',justifyContent:'space-between'}}>
    <span>{item.sendId}请求添加您为好友</span>
   <span style={{display:'inline-block',float:'right'}}>
   {
    item.status!=0?<span>{item.status==1?"已接受":"已拒绝"}</span>:<span><Button style={{marginRight:'10px'}} size="small">拒绝</Button><Button type="primary" size="small">接受</Button></span>
   }
   
    </span>
    
    
    </List.Item>)
}
  />
  
};
 const onTabChange = (key, type) => {
    switch (key) {
      case 'tab2':
        dispatch({type:'selfs/getInviteReply'}).then(data=>{
          if(data.code=='0'){
            this.setState({tab2Data:data.data})
          }
        })
        break;
        case 'tab3':
        dispatch({type:'selfs/getFriendInvite'}).then(data=>{
          if(data.code=='0'){
            this.setState({tab3Data:data.data})
          }
        })
        break;
     
    }
    this.setState({ [type]: key });

  }

  const data = [
  {
    userName: 'Title 1',
    content:'sklajfksdjfkalsdkjfasdjfalsfjdskjfalfjsdkjfksdjfid',
    dateTime:'2017-2-20 11:33:50'
  },
  {
    userName: 'Title 2',
    content:'sklajfksdjfkalsdkjfasdjfalsfjdskjfalfjsdkjfksdjfid',
    dateTime:'2017-2-20 11:33:50'
  },
  {
    userName: 'Title 3',
    content:'sklajfksdjfkalsdkjfasdjfalsfjdskjfalfjsdkjfksdjfid',
    dateTime:'2017-2-20 11:33:50'
  },
  {
    userName: 'Title 4',
    content:'sklajfksdjfkalsdkjfasdjfalsfjdskjfalfjsdkjfksdjfid',
    dateTime:'2017-2-20 11:33:50'
  },
];

    return(
      <div>
    
         <Card
          style={{ width: '100%',backgroundColor:'transparent' }}
          title="邀请"
          bordered={false}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => { onTabChange(key, 'key'); }}
        >
          {contentList[this.state.key]}
        </Card>
      
      
                  <Card
                   title="留言"
                   bordered={false}
                   style={{ width: '100%',backgroundColor:'transparent' }}
                  >
                     <List
    grid={{ gutter: 16, column: 4 }}
    dataSource={data}
     pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 4,
    }}
    renderItem={item => (
      <List.Item>
        <Card title={item.userName}
          bodyStyle={{height:'120px',width:'100%',wordWrap:'break-word'}}
           headStyle={{height:'20px',fontSize:'14px'}}
           actions={[<span>{item.dateTime}</span>]}
           >
        {item.content}
               
        </Card>
      </List.Item>
    )}
  />

                  </Card>
    
      </div>
      )
  }
}


export default connect(({selfs})=>({selfs}))(Message)


// const Message  = ()=>{
// 	return(
// 		<div>
// 			Message Index
// 		</div>
// 		)
// }

// export default Message;