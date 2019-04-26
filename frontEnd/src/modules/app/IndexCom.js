import { List, Card,Row ,Col,Avatar,Tag,Icon} from "antd";
import {Link} from 'dva/router'
import React from 'react'
import { connect } from "dva";

class IndexCom extends React.Component{
      constructor(props){
        super(props)
        this.state = {data:[],daily:[],newBooks:[]}
      }

      componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:'home/pageBooks'}).then(data=>{
          this.setState({daily:data.data.daily,newBooks:data.data.newBooks})
        })
      }

      render(){
        
const gridStyle = {
  width: '33.3%',
  textAlign: 'center',
};


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
              <Icon type="eye" />点赞
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
            dataSource={this.state.newBooks}
            renderItem={item => (
              <List.Item style={{borderBottom:'1px dashed orange',textAlign:'center'}}>
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<Link to={`/book/${item.id}`}>{`《${item.bookName}》`}</Link>}
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
