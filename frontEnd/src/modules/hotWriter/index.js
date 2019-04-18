import { connect } from "dva";
import {List,Popover,Avatar,Row,Col} from 'antd'
import React from 'react'
import { Route, Switch, Link, routerRedux, Redirect,withRouter } from "dva/router";
import dynamic from "dva/dynamic";
import app from "../../index.js";
import IndexCom from './IndexCom'

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

const menu = [
	{menuname:'hotWriter/:id',cpath:'details'},
	]
  const ComArr = renderComponent(menu,"./");


class HotWriter extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		
    const {history} = this.props
		return(
			<div>
			
			<Switch>
           <Route
            path={"/hotWriter"}
            exact
            render={()=><IndexCom history={history}/>}
           />
            {
               f_getRoutes(ComArr)
            }
      

            

          </Switch>
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

export default connect(({ hotWriter }) => ({ hotWriter }))(HotWriter);