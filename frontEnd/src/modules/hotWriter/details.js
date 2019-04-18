import { connect } from "dva";
import {List,Popover,Avatar,Row,Col,message,Button} from 'antd'
import {Link} from 'dva/router'
import React from 'react'
import moment from 'moment';


class Writer extends React.Component{
	constructor(props){
		super(props)
		this.state={bookMsg:[],selfMsg:{},friends:[]}

	}
	componentDidMount(){
		let temp = window.location.pathname.split('/');
        let writerId = temp[temp.length-1];
        const {dispatch} = this.props
        dispatch({type:'hotWriter/getWriterDetail',payload:{writerId:writerId}}).then(data=>{
        	if(data.code=='0'){
        		data.data.friends.push(sessionStorage.getItem('userId'))
        		this.setState({bookMsg:data.data.bookMsg,selfMsg:data.data.selfMsg,friends:data.data.friends})
        	}else{
        		message.error(data.msg)
        	}
        })
	}
	render(){
		const dataSource = {author:'Neo',birth:'1997-2-20',sex:1,yearsOld:22,books:[{id:12,title:'Test'},{id:72,title:'Test'},{id:92,title:'Test'}]}
        const {selfMsg,bookMsg} = this.state
        const {dispatch} = this.props
        const sendInvite = (id)=>{
              dispatch({type:'hotWriter/sendFriendInvite',payload:{receiveId:id}}).then(data=>{
              	if(data.code=='0'){
              		message.success("发送邀请成功！")
              	}else{
              		message.error(data.msg)
              	}
              })
        }
		return(
			<div>
			<img src={`/src/assets/images/aaa.jpg`} style={{width:150,height:150}}/>
			<h2>{selfMsg.penName}</h2>
			
			<Row gutter={16}>
			
				
				<Col span={6}> 
					{sessionStorage.getItem('userId')&&(!this.state.friends.includes(selfMsg.id))&&<Button type="primary" onClick={()=>sendInvite(selfMsg.id)}>添加好友</Button>}
				</Col>
				<Col span={6}> 
					wt生旦日：{moment().format('YYYY-MM-DD',selfMsg.create_date)}
				</Col>
				<Col span={6}> 
					性别：{selfMsg.gender==0?'男':'女'}
				</Col>
				<Col span={6}> 
					昵称：{selfMsg.nickName}
				</Col>
			</Row>
			<Row>
				<List grid={{ gutter: 16, column: 4 }} header={<div>作品集</div>}>
			{
				bookMsg.map(item=>{
					return(
						<List.Item key={item.id}>
                          <Link to={'/book/'+item.id}>《{item.bookName}》</Link>
			            </List.Item>
						)
				})
			}
			
			</List>
			</Row>
			</div>
			
			)
	}




}

// const HotWriter  = ()=>{
// 	const content = (
//   <div>
//     <p>Content</p>
//     <p>Content</p>
//   </div>
// );
// 	return(
// 		<div>
// 			 <Popover content={content} title="Title" trigger="hover">
//                <Avatar size={64} icon="user" />
//              </Popover>
// 		</div>
// 		)
// }

export default connect(({ hotWriter }) => ({ hotWriter }))(Writer);