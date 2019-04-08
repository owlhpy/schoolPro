import { connect } from "dva";
import {List,Popover,Avatar,Row,Col} from 'antd'
import {Link} from 'dva/router'
import React from 'react'


class Writer extends React.Component{
	constructor(props){
		super(props)

	}
	render(){
		const dataSource = {author:'Neo',birth:'1997-2-20',sex:1,yearsOld:22,books:[{id:12,title:'Test'},{id:72,title:'Test'},{id:92,title:'Test'}]}
        
		return(
			<div>
			 <img src={`/src/assets/images/aaa.jpg`} style={{width:150,height:150}}/>
			<h2>{dataSource.author}</h2>
			<Row gutter={16}>
				<Col span={8}> 
					生日：{dataSource.birth}
				</Col>
				<Col span={8}> 
					性别：{dataSource.sex==1?'男':'女'}
				</Col>
				<Col span={8}> 
					年龄：{dataSource.yearsOld}
				</Col>
			</Row>
			<Row>
				<List grid={{ gutter: 16, column: 4 }} header={<div>作品集</div>}>
			{
				dataSource.books.map(item=>{
					return(
						<List.Item key={item.id}>
                          <Link to={'./'}>《{item.title}》</Link>
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