import {List,Row,Col,Avatar,Icon} from 'antd'
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
          const list = {
            bookname:"TestBook",
            bookid:1,
            chapters:[{chapternum:1,chapterid:2,chaptername:"我是第一章",writer:"hpy",desc:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"},
            {chapternum:2,chapterid:3,chaptername:"第二章是我sdasdfasdfafasd",writer:"Jack",desc:"第二章简介简介简介第二章简介简介简介第二章简介简介简介第二章简介简介简介"}],
            collection:12,
            id:3,
            recommend:10,
            chapternum:2,
            img:"one.png"

        } 
       return(
    <div>
     <h2>{`《${list&&list.bookname}》`}</h2>         
               
                <Row gutter={16}>
                <Col span={6}>
                    <img src={`/src/assets/images/aaa.jpg`} style={{width:'100%'}}/>
                </Col>
                <Col span={12}>
                 <h3><Icon type="book" />目录</h3>
                 <List grid={{ gutter: 16, column: 2 }}>
                    {
                        list.chapters.map(item=>{
                            return(
                               
                                    <List.Item key={item.chapterid}>
                                        <Link to={`/book/details/5896`}>{`第${item.chapternum}章：${item.chaptername}`}</Link>
                                    </List.Item>
                              
                                )
                        })
                    }
                  </List>
                  <h3>作者团</h3>
                  <List grid={{ gutter: 16, column: 8 }}>
                    {
                        list.chapters.map(item=>{
                            return(
                               
                                    <List.Item key={item.chapterid} style={{textAlign:'center'}}>
                                       <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                       <p>{item.writer}</p>
                                    </List.Item>
                              
                                )
                        })
                    }
                  </List>

                </Col>
                <Col span={6}>
                   <List grid={{ gutter:16, column: 3 }}>
            <List.Item>
              <h4><Icon type="star" theme="twoTone" twoToneColor="orange"/>收藏</h4>
              <h4 style={{textAlign:'center',width:'100%'}}>{list.collection}</h4>
            </List.Item>
            <List.Item>
              <h4><Icon type="eye" />推荐</h4>
              <h4 style={{textAlign:'center',width:'100%'}}>{list.recommend}</h4>
            </List.Item>
            <List.Item>
              <h4><Icon type="book"/>章节</h4>
              <h4 style={{textAlign:'center',width:'100%'}}>{list.chapternum}</h4>
            </List.Item>
          </List>
                </Col>
                
                </Row>
                </div>
    )
      }
}


export default connect(({ book }) => ({ book }))(IndexCom);
