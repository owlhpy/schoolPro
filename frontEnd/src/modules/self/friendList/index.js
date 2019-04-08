import React from 'react'
import {List,Avatar,Button,Row,Col,Form,Input,Select} from 'antd'
import { connect } from "dva";
import {routerRedux} from 'dva/router'


class FriendList extends React.Component{
	constructor(props){
		super(props)
		this.state={isInvite:false,isShowContent:false,isLiveMsg:false,isShowInvite:false,user:null}
	}

	render(){
    const {dispatch} = this.props
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const handleClick = (key)=>{
         if(key=="ok"){
         this.setState({isCheck:1})
         }else{
          this.setState({isCheck:2})
         }
    }
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
		
		const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 5',
  },
  {
    title: 'Ant Design Title 6',
  },
];
const handleContent = (form)=>{
      
}
const handleInvite = (form)=>{

}
const { TextArea } = Input;
		return(
			<div>
					
       <Row gutter = {32}>
         <Col span={18}>

           <List
    itemLayout="horizontal"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 4,
      size:'small'
    }}
    dataSource={data}
    renderItem={item => (
      <List.Item actions={[<Button type="primary"  onClick={(e)=>{this.setState({isShowInvite:true,isShowContent:false,user:item.title})}}>邀请写作</Button>, <Button  onClick={(e)=>{this.setState({isShowContent:true,isShowInvite:false,user:item.title})}}>留言</Button>]}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
       
      </List.Item>
    )}
  /> 
         </Col>
         <Col span={6}>
         {this.state.isShowContent||this.state.isShowInvite?<h4>To:{this.state.user}</h4>:''}
        {
          this.state.isShowContent?<Form style={{width:'300px'}} onSubmit={handleContent}>
                <Form.Item label="留言内容">
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                   <TextArea rows={4} />
                  )}
                </Form.Item>
                <Form.Item style={{paddingLeft:'50%'}}>
                  <Button onClick={()=>{this.setState({isShowContent:false,user:null})}} style={{marginRight:'10px'}}>取消</Button>
                  <Button type="primary" onClick={handleContent}>留言</Button>
                </Form.Item>
                </Form>:''
        }
         {this.state.isShowInvite?<Form style={{width:'300px'}} onSubmit={handleInvite}>
                 <Form.Item label="选择书本">
                   {getFieldDecorator('userName', {
                     rules: [{ required: true, message: 'Please input your username!' }],
                   })(
                      <Select defaultValue="《OWLhpy》">
                              <Option value="lucy">Lucy</Option>
                              <Option value="lucy">Nacy</Option>
                     </Select>
                   )}
                 </Form.Item>
                 <Form.Item label="章节">
                   {getFieldDecorator('userName', {
                     rules: [{ required: true, message: 'Please input your username!' }],
                   })(
                     <Input placeholder="章节" disabled/>
                   )}
                 </Form.Item>
                 <Form.Item style={{paddingLeft:'50%'}}>
                  <Button onClick={()=>{this.setState({isShowInvite:false,user:null})}} style={{marginRight:'10px'}}>取消</Button>
                  <Button type="primary">邀请</Button>
                </Form.Item>
                 </Form>:''
           }
         </Col>
       </Row>
      



			</div>
		
				
				
		
			)
	}
}

export default connect(({selfs})=>({selfs}))(Form.create()(FriendList)
  )

// class Product extends React.Component{
// 	constructor(props){
// 		super(props)
// 	}
// 	render(){
// 		return(
// 			<div></div>
// 			)
// 	}
// }
// const FriendList  = ()=>{
// 	return(
// 		<div>
// 			FriendList Index
// 		</div>
// 		)
// }

// export default FriendList