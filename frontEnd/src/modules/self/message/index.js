import React from 'react'
import { Card,List,Button,message} from 'antd';
import {Link} from 'dva/router'
import { connect } from "dva";
import moment from 'moment';

class Message extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    key: 'tab1',
    tab1Data:[],
    tab2Data:[],
    tab3Data:[],
    msg:[]//留言
    }
  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({type:'selfs/getInvitedBookMsg'}).then(data=>{
      if(data.code=='0'){
        this.setState({tab1Data:data.data});
      }
    })
    dispatch({type:'selfs/getMessage'}).then(data=>{
      if(data.code=='0'){
        this.setState({msg:data.data});
      }
    })

  }

  render(){
    const {dispatch} = this.props
    const tabList = [{
  key: 'tab1',
  tab: '受邀写作通知',
}, {
  key: 'tab2',
  tab: '写作邀请回复',
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
       dispatch({type:'selfs/getInvitedBookMsg'}).then(data=>{
      if(data.code=='0'){
        this.setState({tab1Data:data.data});
      }
       })
    }else{
      message.error('出错')
    }
    
  })
}
const handleFriendInvite=(type,transmitId)=>{
  dispatch({type:'selfs/saveFriendInvite',payload:{type:type,transmitId:transmitId}}).then((data)=>{
    if(data.code=='0'){
      message.success('成功！');
      dispatch({type:'selfs/getFriendInvite'}).then(data=>{
          if(data.code=='0'){
            this.setState({tab3Data:data.data})
          }
        })
    }else{
      message.error('出错')
    }
    
  })
}

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
    <span>邀请{item.penName}参与<Link to="/">《{item.bookName}》</Link>第{item.chapterNum}章的续写</span>
    <span style={{display:'inline-block',float:'right'}}>状态：{switchStatus(item.status)}</span></List.Item>)}
  />,
   tab3: 
  <List 
   dataSource={this.state.tab3Data}
   grid={{ gutter: 32, column: 2}}
   renderItem={item => (<List.Item style={{display:'flex',justifyContent:'space-between'}}>
    <span>{item.penName}请求添加您为好友</span>
   <span style={{display:'inline-block',float:'right'}}>
   {
    item.status!==0?<span>{item.status==2?'已拒绝':'已接受'}</span>: <span><Button style={{marginRight:'10px'}} size="small" onClick={()=>handleFriendInvite(2,item.transmitId)}>拒绝</Button><Button type="primary" size="small" onClick={()=>handleFriendInvite(1,item.transmitId)}>接受</Button></span>
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
        case 'tab1':
        dispatch({type:'selfs/getInvitedBookMsg'}).then(data=>{
      if(data.code=='0'){
        this.setState({tab1Data:data.data});
      }
       })
        break;
     
    }
    this.setState({ [type]: key });

  }

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
    dataSource={this.state.msg}
    renderItem={item => (
      <List.Item>
        <Card title={<span>来自<b>{item.penName}</b>的留言</span>}
          bodyStyle={{height:'120px',width:'100%',wordWrap:'break-word'}}
           headStyle={{height:'20px',fontSize:'14px'}}
           actions={[<span>{moment().format('YYYY-MM-DD h:mm:ss',item.create_date)}</span>]}
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