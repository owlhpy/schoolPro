import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react'
import {Row,Col,Form,Input,Button,Upload,Icon,message} from 'antd'
// import '../../../assets/js/config.js'
import { connect } from "dva";
import {withRouter} from 'dva/router'

class Write extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '',type:0,chapter:{} } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    const {dispatch,selfs,history} = this.props
    console.log('this.porps',this.props)
    
    let paths = window.location.pathname.split('/');
    let bookId = paths[paths.length-1];
    // console.log('bookId',bookId)
    // 0新增书及第一章，1修改一个草稿
    // 修改草稿
    if(bookId.indexOf('-')>1){
       this.setState({type:1})
        let params = {};
        let temp = bookId.split('-');
        this.setState({chapterId:temp[1],bookId:temp[0]})
        params.bookId = temp[0];
        params.chapterId = temp[1];
        dispatch({type:'selfs/getEditChapter',payload:params}).then((data)=>{
          this.setState({chapter:data,text:data.content})
        })
      }else if(bookId.indexOf('write')>=0){
        this.setState({type:0})
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
    const {dispatch,selfs,history} = this.props;
    const { getFieldDecorator } = this.props.form;
    const imageUrl = null
    const {chapter}=this.state;
    const handleSubmit = (e) => {
      // e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if(!this.state.text){
            message.error("内容不能为空")
            return;
          }
          values.content = this.state.text;
          values.type = this.state.type;//0新增书及第一章，1修改一个草稿
          if(this.state.type==0){
            values.num=1;
          }
          values.status = 1;//0草稿，1发表,2待新增         
          console.log('Received values of form: ', values);
          dispatch({type:'selfs/bookSave',payload:values}).then(data=>{
            if(data.code=='0'){
              history.push("/self/product")
            }
          })
           
        }
       
      });
    }
    const handleSave = ()=>{
       this.props.form.validateFields((err, values) => {
        if (!err) {
          values.content = this.state.text;
          values.type = this.state.type;//0新增书及第一章，1修改一个草稿
          if(this.state.type==0){
            values.num=1;
          }
          values.status = 0;//0草稿，1发表,2待新增         
          console.log('Received values of form: ', values);
          dispatch({type:'selfs/bookSave',payload:values}).then(data=>{
            if(data.code=='0'){
              history.push("/self/product")
            }
          })

           
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
                              initialValue:chapter.num,
                            })(
                              <Input hidden />
                            )}
                    </Form.Item>
          }
          <Form.Item label="书名">
                  {getFieldDecorator('bookTitle', {
                    rules: [{ required: true, message: '请输入标题!' }],
                    initialValue:chapter.bookName
                  })(
                    <Input label="标题" placeholder="书名" disabled={chapter.isInvite==0?true:false} />
                  )}
          </Form.Item>
        
          <Form.Item label={`章节标题（第${chapter.num?chapter.num:'1'}章)`}>
          {getFieldDecorator('chapterTitle', {
            rules: [{ required: true, message: '请输入标题!' }],
            initialValue:chapter.title
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
                  style={{height:'40vh',paddingBottom:'40px',backgroundColor:'white'}}


                   />
        </Row>
        <div style={{textAlign:'center',marginTop:'10px'}}>
           <Button onClick={handleSave} style={{marginRight:'10px'}}>
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