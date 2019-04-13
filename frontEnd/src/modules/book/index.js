import { connect } from "dva";
import { Route, Switch, Link, routerRedux, Redirect,withRouter } from "dva/router";
import dynamic from "dva/dynamic";
import app from "../../index.js";
import Details from './details/index'
import IndexCom from './IndexCom'
import React from 'react'

function renderComponent(menu,prePath){
         var arr = [];
         console.log('renderComponent');
         menu.map(item=>{
          if(item.mpath){
            var com={}
            com.c =  dynamic({
              app,
              models: () => [import("./"+ item.mpath + ".js")],
              component: () => import("./"+ item.cpath + ".js")
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
	{menuname:'book/details/:id',cpath:'details/index',mpath:'model'},
	]
  const ComArr = renderComponent(menu,"./");


class Book extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    // console.log('didmount id',this.props.location.id)
  }
  render(){
    return(
      <div>
             
       <Switch>
       <Route
            path={"/book/:id"}
            exact
            render={()=><IndexCom />}
           />
           
            {
               f_getRoutes(ComArr)
            }
      

            

          </Switch>
      </div>
      )
  }


}


export default connect(({ book }) => ({ book }))(Book);