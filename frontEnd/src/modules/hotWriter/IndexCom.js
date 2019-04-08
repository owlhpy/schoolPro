import {List,Popover,Avatar,Row,Col} from 'antd'
import {Link} from 'dva/router'
import React from 'react'
import { connect } from "dva";

class IndexCom extends React.Component{
      constructor(props){
        super(props)
      }

      componentDidMount(){
        let temp = window.location.pathname.split('/');
        // console.log(temp)
        if(temp.length>2){
          console.log(temp[temp.length-1])
        }
      }

      render(){
          const dataSource = [
    {id:1,title:"Neo",sex:1,book:'ahhahhhahhh'},
    {id:2,title:"Neo",sex:1,book:'ahhahhhahhh'},
    {id:3,title:"Neo",sex:1,book:'ahhahhhahhh'},
    {id:4,title:"Neo",sex:1,book:'ahhahhhahhh'},
    {id:11,title:"Neo",sex:1,book:'ahhahhhahhh'},
    {id:21,title:"Neo",sex:1,book:'ahhahhhahhh'},
    {id:31,title:"Neo",sex:1,book:'ahhahhhahhh'},
    {id:41,title:"Neo",sex:1,book:'ahhahhhahhh'}
    ]
    const handleClick = ()=>{
      console.log('ok')
    }

    const books = [{id:112,title:'One',author:'Neo'},{id:12,title:'Two',author:'Neo'},{id:182,title:'AAA',author:'Neo'},{id:812,title:'OnDBBe',author:'Neo'}]
       return(
    <div>
     <List grid={{ gutter: 16, column: 4 }}>
      {
        dataSource.map(item=>{
          return (
            <List.Item key={item.id} style={{textAlign:'left'}}>
            <Popover content={<div>
              <p>性别：{item.sex==1?'男':'女'}</p>
              <p>代表作:{`《${item.book}》`}</p>
              <p onClick={handleClick}>更多作品</p>
              </div>} title="Title" trigger="hover">
              <Avatar size={64} icon="user" />
              <span>{item.title}</span>
              </Popover>
              </List.Item>
              )
        })
      }
      </List>
      {
        books?<List grid={{ gutter: 16, column: 4 }} header={<div>{books[0].author}</div>}>
      {
        books.map(item=>{
          return(
            <List.Item key={item.id}>
                          <Link to={'/writer/123'}>《{item.title}》</Link>
                  </List.Item>
            )
        })
      }
      
      </List>:''
      }
                </div>
    )
      }
}


export default connect(({ book }) => ({ book }))(IndexCom);
