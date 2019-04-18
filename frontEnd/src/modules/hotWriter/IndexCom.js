import {List,Popover,Avatar,Row,Col} from 'antd'
import {Link} from 'dva/router'
import React from 'react'
import { connect } from "dva";
import moment from 'moment';

class IndexCom extends React.Component{
      constructor(props){
        super(props)
        this.state={writers:[]}
      }

       componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:'hotWriter/hotWriter'}).then(data=>{
          if(data.code=='0'){
            this.setState({writers:data.data});
          }
        })
      }

      render(){
        const {history} = this.props
        console.log('this.props',this.props)
        const {writers} = this.state


       
    const handleClick = (id)=>{
      history.push(`/writer/${id}`)
    }

 
       return(
    <div>
     <List grid={{ gutter: 16, column: 4 }}>
      {
        writers.map(item=>{
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


export default connect(({ hotWriter }) => ({ hotWriter }))(IndexCom);
