import { connect } from "dva";
import { Route, Switch, Link, routerRedux, Redirect,withRouter } from "dva/router";
import dynamic from "dva/dynamic";
import app from "../../index.js";

const IndexPage = ()=>{
	return(
		<div>
			作品頁
		</div>
		)
}
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
       	console.log('come next')
         var com = {}
         com.c =  dynamic({
              app,
              component: () => import('./'+ item.cpath + ".js")
            })
          com.menuname=item.menuname
          arr.push({...com})      
     
       }
     })
         console.log('arr',arr)
         return arr
}

function f_getRoutes(com){
    return com.map((item, index) => {

         return (
          <Route
            path={"/" + item.menuname}
            exact
            component={item.c}
            key={index}
          />
        );     
    });
};
const Self  = ({dispatch})=>{
  dispatch({type:'selfs/checkLogin'})
	const menu=[
	{menuname:'self/friendList',cpath:'friendList/index'},
	{menuname:'self/message',cpath:'message/index'},
	{menuname:'self/product',cpath:'product/index'},
	{menuname:'self/setting',cpath:'setting/index'},
  {menuname:'self/write',cpath:'write/index'},
	{menuname:'self/write/:id',cpath:'write/index'},
	]
	const ComArr = renderComponent(menu,"./");
	return(
		<div>

			 <Switch>
			 <Route
            path={"/self"}
            exact
            render={()=><span><Link to={'/self/friendlist'}>friendlist</Link></span>}
           />
           
            {
               f_getRoutes(ComArr)
            }
      

            

          </Switch>
			
		</div>
		)
}

export default connect(({ selfs }) => ({ selfs }))(Self);