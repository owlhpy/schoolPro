import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react'
import {Row,Col,Form,Input,Button,Upload,Icon} from 'antd'
// import '../../../assets/js/config.js'
import { connect } from "dva";

class Write extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '',type:0 } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    const {dispatch,selfs} = this.props
    
    let paths = window.location.pathname.split('/');
    let bookId = paths[paths.length-1];
    console.log('bookId',bookId)
    // 0新增书及第一章，1修改一个草稿，2新增某本书的一个章节
    // 修改草稿
    if(bookId.indexOf('-')>1){
       this.setState({type:1})
        let params = {};
        let temp = bookId.split('-');
        params.bookId = temp[0];
        params.chapterId = temp[1];
        dispatch({type:'selfs/getChapter',payload:params});
      }else if(bookId.indexOf('write')>=0){
        this.setState({type:0})
      }else{
        this.setState({type:2})
      }

  }
 
  handleChange(value) {
    this.setState({ text: value })
  }

  handlePicChange(){

  }
 
  render() {
    console.log('this.state.type',this.state.type)
  	var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];
    const {dispatch,selfs} = this.props;
    const {chapter} = selfs;
    const { getFieldDecorator } = this.props.form;
    const imageUrl = null
    const handleSubmit = (e) => {
      // e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values.content = this.state.text;
          values.type = this.state.type;//0新增书及第一章，1修改一个草稿，2新增某本书的一个章节
          if(this.state.type==0){
            values.num=1;
          }
          values.status = 1;//0草稿，1发表,2待新增         
          console.log('Received values of form: ', values);
          dispatch({type:'selfs/bookSave',payload:values});
           
        }
       
      });
    }
    const handleSave = ()=>{
       this.props.form.validateFields((err, values) => {
        if (!err) {
          values.content = this.state.text;
          values.type = 1;//0新增，1修改
          values.num = 1;
          values.status = 1;//0草稿，1发表；
          console.log('Received values of form: ', values);
          dispatch({type:'selfs/bookSave',payload:values});
           
        }
       
      });
    }
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
         { chapter&&chapter.bookId && <Form.Item style={{display:'none'}}>
                           {getFieldDecorator('bookId', {
                             initialValue:chapter.bookId,
                           })(
                             <Input hidden />
                           )}
                   </Form.Item>
          }
          {chapter&&chapter.chapterId &&<Form.Item style={{display:'none'}}>
                            {getFieldDecorator('chapterId', {
                              initialValue:chapter.chapterId,
                            })(
                              <Input hidden />
                            )}
                    </Form.Item>
          } 
          {chapter&&chapter.num &&<Form.Item style={{display:'none'}}>
                            {getFieldDecorator('num', {
                              initialValue:chapter.num+1,
                            })(
                              <Input hidden />
                            )}
                    </Form.Item>
          }
          <Form.Item label="书名">
                  {getFieldDecorator('bookTitle', {
                    rules: [{ required: true, message: '请输入标题!' }],
                  })(
                    <Input label="标题" placeholder="书名" />
                  )}
          </Form.Item>
        
          <Form.Item label="章节标题（第一章）">
          {getFieldDecorator('chapterTitle', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input label="标题" placeholder="章节标题" />
          )}
        </Form.Item>
          </Col>
          <Col span={6}>
                <Form.Item label="书封面图片">
          {getFieldDecorator('pic', {
          
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
        {imageUrl ? <img src={'/src/assets/images/'+imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
          )}
        </Form.Item>
          </Col>
           </Form> 
      
            
        
            
        </Row>
        <Row>
           <ReactQuill value={this.state.text || ''}
                  onChange={this.handleChange}
                  modules={{toolbar:toolbarOptions}}
                  style={{height:'50vh',marginBottom:'50px'}}
                   />
        </Row>
        <div style={{textAlign:'center'}}>
        <Button onClick={()=>{console.log('ok')}} style={{marginRight:'10px'}}>
           重置
        </Button>
           <Button onClick={handleSave}>
           存草稿
        </Button>
        <Button type="primary" onClick={handleSubmit}>
           提交
        </Button>
        </div>
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