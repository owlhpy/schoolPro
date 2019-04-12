import {Menu,Layout,Button,Icon,Dropdown,Input} from 'antd'
import {Link,routerRedux} from 'dva/router'
import "../../assets/css/index.css";
const { Header} = Layout;
const Search = Input.Search;

const IndexMenu = ()=>{
	 return (
      
      <Menu
        mode="horizontal"
        style={{ backgroundColor: "transparent" }}
        selectedKeys={["daily"]}
      >
        <Menu.Item key="daily">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="discuss">
          <Link to="/hotWriter">热门作者</Link>
        </Menu.Item>
      </Menu>
   
    );
}

const LoginBtn = ({dispatch,user})=>{
	 const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/self/product">作品</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/self/write">新建作品</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/self/friendList">好友列表</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/self/message">消息</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/self/setting">設置</Link>
        </Menu.Item>
      </Menu>
    );
    if(sessionStorage.__SID){
         return (
        <div>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              {user} <Icon type="down" />
            </a>
          </Dropdown>
          <Button size="small" onClick ={()=>{dispatch({type:'home/logout'})}}>退出登錄</Button>
        </div>
      );
    }
	return ( 
        <div>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => {
              dispatch(routerRedux.push("/signup"));
            }}
          >
            注册新用户
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch(routerRedux.push("/login"));
            }}
          >
            登录
          </Button>
        </div>
      );
}


const WrapperHeader = ({dispatch,user})=>{
	return (
		<Header className="header">
          <div>
              <img src="/src/assets/images/logo2.png" style={{height:50}}/>
          </div>
          <div>         
            <IndexMenu />
          </div>
          <div>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <LoginBtn user={user} dispatch={dispatch} />
          </div>
        </Header>
		)
}


export default WrapperHeader;