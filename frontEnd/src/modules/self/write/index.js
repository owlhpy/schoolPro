import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react'
import {Row,Col,Form,Input,Button,Upload,Icon} from 'antd'
import { connect } from "dva";

class Write extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }
 
  handleChange(value) {
    this.setState({ text: value })
  }

  handlePicChange(){

  }
 
  render() {
  	var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];
    const { getFieldDecorator } = this.props.form;
    const imageUrl = null
    const beforeUpload = ()=>{

    }
     const uploadButton = (
      <div>
        <Icon type={'plus'} />
        <div style={{ width:'128px',height: '128px'}}>Upload</div>
      </div>
    );
    return (
      <div>
        <Row gutter={32}>
        <Form>
          <Col span={18}>
          
          <Form.Item label="章节标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input label="标题" placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item label="内容">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入内容!' }],
          })(
             <ReactQuill value={this.state.text}
                  onChange={this.handleChange}
                  modules={{toolbar:toolbarOptions}}
                  name="content"
                  style={{height:'50vh',marginBottom:'50px'}}
                   />
               
          )}
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" style={{width:'100%'}} onClick={()=>{console.log('ok')}}>
           提交
        </Button>
        </Form.Item>
         
         
          </Col>
          <Col span={6}>
                <Form.Item label="书封面图片">
          {getFieldDecorator('pic', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
             <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handlePicChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
          )}
        </Form.Item>
          </Col>
           </Form> 
        </Row>
      </div>
      
    )
  }
}



// const Write  = ()=>{
// 	return(
// 		<div>
// 			Write Index
			
// 		</div>
// 		)
// }

export default connect(({ selfs }) => ({ selfs }))(Form.create()(Write))