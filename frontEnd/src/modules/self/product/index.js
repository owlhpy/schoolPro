import { List, Card,Row ,Col,Avatar,Tag,Icon,Input,Button} from "antd";
import {Link} from 'dva/router'
import React from 'react'
import { connect } from "dva";
const Search = Input.Search;


class Product extends React.Component{
	constructor(props){
		super(props)
    this.state = {editProd:[],selfProd:[]}
    
	}
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({type:'selfs/getProducts'}).then((prod)=>{
      this.setState({editProd:prod.editProd,selfProd:prod.selfProd})
    })
  }
	render(){
    const {disaptch,history,match,selfs} = this.props;
    const {products} = selfs
    const handleWrite = (bookId,chapterId,status)=>{
      console.log('bookId,chapterId',bookId,chapterId);
      //0草稿，1发表,2待新增
      switch (status) {
        case 0:
           history.push(`/self/write/${bookId}-${chapterId}`)
          break;
        case 2:
           history.push(`/self/write/${bookId}`);
        break;
      }
      
    }
    const data1 = [
{id:1,fromUser:'hpy',fromUserid:11,bookId:22,bookname:"HelloWord",chapterId:3336,chapterNum:2,status:1},
{id:2,fromUser:'hpy',fromUserid:11,bookId:12,bookname:"gggggg",chapterId:436,chapterNum:3,status:1},
{id:3,fromUser:'hpy',fromUserid:11,bookId:92,bookname:"HddoWord",chapterId:336,chapterNum:6,status:2}
]

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
      <h2>待续写作品</h2>
      <Row>
        <Col>
          <List 
   dataSource={this.state.editProd}
   grid={{ gutter: 32, column: 2}}
   renderItem={item => (<List.Item style={{display:'flex',justifyContent:'space-between'}}>
    <span>{ `《${item.bookName}》第${item.chapterNum}章`}</span>
    <Button size="small" onClick = {()=>{handleWrite(item.bookId,item.chapterId,item.status)}} type="primary">去续写</Button>
    
    
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