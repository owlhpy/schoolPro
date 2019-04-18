import {Layout} from 'antd'
import {WrapperHeader} from '../../components/index'
import { connect } from "dva";
import dynamic from "dva/dynamic";
import app from "../../index.js";
import "../../assets/css/index.css";
import { Route, Switch, Link, routerRedux, Redirect,withRouter} from "dva/router";
import IndexCom from './IndexCom'
// import {f_getRoutes,renderComponent} from '../../utils/utils'

const {Footer,Content } = Layout;



function renderComponent(menu,prePath){
         var arr = [];
         console.log('renderComponent');
         menu.map(item=>{
          if(item.mpath){
            var com={}
            com.c =  dynamic({
              app,
              models: () => [import("../"+ item.mpath + ".js")],
              component: () => import("../"+ item.cpath + ".js")
            })
          com.menuname=item.menuname
          arr.push({...com})

       }else{
         var com = {}
         com.c =  dynamic({
              app,
              component: () => import(prePath+ item.cpath + ".js")
            })
          com.menuname=item.menuname
          arr.push(com)      
     
       }
     })
         return arr
}

function f_getRoutes(com){
    return com.map((item, index) => {

         return (
          <Route
            path={"/" + item.menuname}
            component={item.c}
            key={index}
          />
        );     
    });
};



const App = ({home,dispatch,location})=>{
	// const {user} = home
  const user = sessionStorage.getItem('__SID'); 
	const menu = [
	{menuname:'book',cpath:'book/index',mpath:'book/model'},
	{menuname:'hotWriter',cpath:'hotWriter/index',mpath:'hotWriter/model'},
	{menuname:'login',cpath:'login/index',mpath:'login/model'},
	{menuname:'signup',cpath:'signup/index',mpath:'signup/model'},
	{menuname:'writer/:id',cpath:'hotWriter/details',mpath:'hotWriter/model'},
	{menuname:'setting',cpath:'setting/index',mpath:'setting/model'},
  {menuname:'self',cpath:'self/index',mpath:'self/model'},
	]
  const ComArr = renderComponent(menu,"../");
  console.log('ComArr',ComArr)
	return (
         <div>
         	 <Layout>
        <WrapperHeader dispatch={dispatch} user={user} />
        <Content className="content">
         
          	 <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <IndexCom />;
              }}
            />
           
            {
               f_getRoutes(ComArr)
            }
      

            

          </Switch>
         
        </Content>
        <Footer className="footer">&copy;owlhpy</Footer>
       </Layout>
         </div>
		)
}

export default withRouter(connect(({ home }) => ({ home }))(App));