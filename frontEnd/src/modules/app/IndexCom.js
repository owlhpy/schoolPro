import { List, Card,Row ,Col,Avatar,Tag,Icon} from "antd";
import {Link} from 'dva/router'
import React from 'react'
import { connect } from "dva";

class IndexCom extends React.Component{
      constructor(props){
        super(props)
        this.state = {data:[],daily:[]}
      }

      componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:'home/pageBooks'}).then(data=>{
          this.setState({daily:data.data})
        })
      }

      render(){
          const data = [
  {
    title: '一个叫欧维的男人决定去死',
    bookid:12
  },
  {
    title: '十二国记',
    bookid:13
  },
  {
    title: '我的天才女友',
    bookid:14
  },
  {
    title: '人鼠之间',
    bookid:15
  },
  {
    title: '面纱',
    bookid:166
  },
  {
    title: 'GoGoGo',
    bookid:157
  },
];
const gridStyle = {
  width: '33.3%',
  textAlign: 'center',
};
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
  },
  { chapternum:3,
    desc:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
    collection:12,
    id:3,
    recommend:10,
    bookname:"TestBook",
    img:"one.png",
    bookid:3
  },
  { chapternum:3,
    desc:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
    collection:12,
    id:4,
    recommend:10,
    bookname:"OWLHPY",
    img:"one.png",
    bookid:4
  }
  ]

  const {home} = this.props
        return(
        <Row gutter={32}>
        <Col span={18}>

         <List
    grid={{ gutter: 16, column: 3 }}
    dataSource={this.state.daily}
    renderItem={book => (
      <List.Item style={{textAlign:'center',borderBottom:'1px solid orange',boxShadow:'0px 1px -1px grey'}}>
       
      
          <img src="/src/assets/images/aaa.jpg" style={{width:'100%',marginBottom:10}} />
          <h3>
          <Link 
          to={'/book/'+book.id}>
          {`《${book.bookName}》`}
          </Link>
          </h3>
          <List grid={{ gutter: 16, column: 3 }}>
            <List.Item>
              <Icon type="star" />收藏
              <div style={{textAlign:'center',width:'100%'}}>{book.collections?book.collections:0}</div>
            </List.Item>
            <List.Item>
              <Icon type="eye" />推荐
              <div style={{textAlign:'center',width:'100%'}}>{book.recommends?book.recommends:0}</div>
            </List.Item>
            <List.Item>
              <Icon type="book" />章节
              <div style={{textAlign:'center',width:'100%'}}>{book.chapterNum}</div>
            </List.Item>
          </List>  
      </List.Item>
      
    )}
  >

  </List>
        </Col>

        {
          <Col span={6}>
              <List
              size="small"
               header={<span style={{fontFamily:'微软雅黑',fontSize:22,fontWeight:'bold'}}>新作推荐</span>}
               bordered={false}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item style={{borderBottom:'1px dashed orange',textAlign:'center'}}>
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<Link to={`/details/${item.bookid}`}>{`《${item.title}》`}</Link>}
                  // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
         
                </Col>
              }
        
        </Row>
    )
      }
}


export default connect(({ home }) => ({ home }))(IndexCom);
