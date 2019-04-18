import { connect } from "dva";
import React from 'react'
import {List,Popover,Icon,Avatar} from 'antd'
import {Link} from 'dva/router'
import moment from 'moment';

class Search extends React.Component{
	constructor(props){
		super(props)
		this.state={bookMsg:[],writerMsg:[]}
	}
	componentDidMount(){
		let temp = window.location.pathname.split('/');
        let value = temp[temp.length-1];
        console.log('value',value)
        const {dispatch} = this.props;
        dispatch({type:'search/searchValue',payload:{data:value}}).then(data=>{
        	if(data.code=='0'){
        		this.setState({bookMsg:data.data.bookMsg,writerMsg:data.data.writerMsg})
        	}
        })
	}
	render(){
		const {history} = this.props;


		 const handleClick = (id)=>{
          history.push(`/writer/${id}`)
        }
		return(
			<div>
			<h2>书籍</h2>
			 <List
    grid={{ gutter: 16, column: 6 }}
    dataSource={this.state.bookMsg}
    renderItem={item => (
      <List.Item style={{textAlign:'center',borderBottom:'1px solid orange',boxShadow:'0px 1px -1px grey'}}>
       
      
          <img src={`/src/assets/images/${item.pic}` }style={{width:'100%',marginBottom:10}} />
          <h4>
          <Link 
          to={`/book/${item.id}`}>
          {`《${item.bookName}》`}
          </Link>
          </h4>
          
      </List.Item>
      
    )}
  >

  </List>

  <h2>作者</h2>
  <List grid={{ gutter: 16, column: 4 }}>
      {
        this.state.writerMsg.map(item=>{
          return (
            <Popover key={item.id} content={<div>
              <p>昵称:{`${item.nickName}`}</p>
              <p>wt生旦日:{`${moment().format('YYYY-MM-DD',item.create_date)}`}</p>
              <p>性别：{item.gender==0?'男':'女'}</p>             
              <a onClick={()=>handleClick(item.id)}>查看作品</a>
              </div>} title={item.penName} trigger="hover"
              placement="topLeft"
              >
              
            <List.Item key={item.id} style={{textAlign:'left'}}>
              <Avatar size={64} icon="user" />
              <span>{item.penName}</span>
              
              </List.Item>
              </Popover>
              )
        })
      }
      </List>
			</div>
			)
	}
}



export default connect(({ search }) => ({ search }))(Search);