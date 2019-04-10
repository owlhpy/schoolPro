import { List, Card,Row ,Col,Avatar,Tag,Icon,Input} from "antd";
import {Link} from 'dva/router'
import React from 'react'
import { connect } from "dva";
const Search = Input.Search;


class Product extends React.Component{
	constructor(props){
		super(props)
    
	}
  componentDidMount(){
    
  }
	render(){
		const daily = [
  { chapternum:3,
    desc:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
    collection:12,
    id:1,
    recommend:10,
    bookname:"OWLHPY",
    img:"one.png",
    bookid:1
  },
 { chapternum:3,
    desc:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
    collection:12,
    id:2,
    recommend:10,
    bookname:"TestBookTestBook",
    img:"one.png",
    bookid:2
  }
  ]
		return(
			<div>
				<h2>我的作品</h2>
				<Row gutter={32}>
        <Col span={18}>

         <List
    grid={{ gutter: 16, column: 3 }}
    dataSource={daily}
    renderItem={book => (
      <List.Item style={{textAlign:'center',borderBottom:'1px solid orange',boxShadow:'0px 1px -1px grey'}}>
       
      
          <img src="/src/assets/images/aaa.jpg" style={{width:'100%',marginBottom:10}} />
          <h3>
          <Link 
          to={'/book/123456'}>
          {`《${book.bookname}》`}
          </Link>
          </h3>
          <List grid={{ gutter: 16, column: 3 }}>
            <List.Item>
              <Icon type="star" />收藏
              <div style={{textAlign:'center',width:'100%'}}>{book.collection}</div>
            </List.Item>
            <List.Item>
              <Icon type="eye" />推荐
              <div style={{textAlign:'center',width:'100%'}}>{book.recommend}</div>
            </List.Item>
            <List.Item>
              <Icon type="book" />章节
              <div style={{textAlign:'center',width:'100%'}}>{book.chapternum}</div>
            </List.Item>
          </List>  
      </List.Item>
      
    )}
  >

  </List>
        </Col>
        <Col span={6}>
             <Search
              placeholder="作品快捷搜索"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
        </Col>
      
        
        </Row>

			</div>
			)
	}
}
// const Product  = ()=>{
// 	return(
// 		<div>
// 			Product Index
// 		</div>
// 		)
// }

export default connect(({selfs})=>({selfs}))(Product);