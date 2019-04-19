import { List, Card,Row ,Col,Avatar,Tag,Icon,Input,Button} from "antd";
import {Link} from 'dva/router'
import React from 'react'
import { connect } from "dva";
const Search = Input.Search;


class Product extends React.Component{
	constructor(props){
		super(props)
    this.state = {editProd:[],selfProd:[],originSelfProd:[],collectProd:[]}
    
	}
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({type:'selfs/getProducts'}).then((prod)=>{
      // console.log('prod',prod)
      this.setState({editProd:prod.editProd,selfProd:prod.selfProd,originSelfProd:prod.selfProd,collectProd:prod.collectProd})
    })
  }
	render(){
    const {disaptch,history,match,selfs} = this.props;
    const {products} = selfs
    const handleWrite = (bookId,chapterId)=>{
      console.log('bookId,chapterId',bookId,chapterId);
      history.push(`/self/write/${bookId}-${chapterId}`)
      
    }
    const handleSearch = (value)=>{
      console.log('in')
      if(!value){
        this.setState({selfProd:this.state.originSelfProd})
      }
      let result = this.state.originSelfProd.map(item=>{
        if(item.bookName.indexOf(value)>=0 || item.num.toString().indexOf(value)>=0)
          return item;
      })
      result = result.filter(item=>item!=undefined);
      this.setState({selfProd:result});
    }
    
		return(
			<div>
      
      <Row gutter={32}>
        <Col span={12}>
        <h2>待续写作品</h2>
          <List 
   dataSource={this.state.editProd}
   renderItem={item => (<List.Item  style={{display:'flex',justifyContent:'space-between'}}>
    <span>{ `《${item.bookName}》第${item.chapterNum}章`}</span>
    <Button size="small" onClick = {()=>{handleWrite(item.bookId,item.chapterId)}} type="primary">去续写</Button>
    
    
    </List.Item>)
}
  />
        </Col>
        <Col span={12}>
        <h2>我的收藏</h2>
          <List 
          grid={{ gutter: 16, column: 2 }}
   dataSource={this.state.collectProd}
   renderItem={item => (<List.Item >
    <Link to={`/book/${item.id}`}>{ `《${item.bookName}》`}</Link>
    
    </List.Item>)
}
  />
        </Col>
        
      </Row>
 
				<h2>我的作品</h2>
				<Row gutter={32}>
        <Col span={18}>

         <List
    grid={{ gutter: 16, column: 3 }}
    dataSource={this.state.selfProd}
    renderItem={item => (
      <List.Item style={{textAlign:'center',borderBottom:'1px solid orange',boxShadow:'0px 1px -1px grey'}}>
       
      
          <img src={`/src/assets/images/${item.pic}` }style={{width:'100%',marginBottom:10}} />
          <h4>
          <Link 
          to={`/book/details/${item.id}`}>
          {`《${item.bookName}》第${item.num}章`}
          </Link>
          </h4>
          
      </List.Item>
      
    )}
  >

  </List>
        </Col>
        <Col span={6}>
             <Search
              placeholder="作品快捷搜索"
              onSearch={handleSearch}
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