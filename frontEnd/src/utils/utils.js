import { Route, Switch, Link, routerRedux, Redirect } from "dva/router";
import dynamic from "dva/dynamic";
import app from "../index.js";

function renderComponent(menu,prePath){
         var arr = [];
         console.log('renderComponent');
         menu.map(item=>{
          if(item.mpath){
            var com={}
            com.c =  dynamic({
              app,
              models: () => [import(prePath+ item.mpath + ".js")],
              component: () => import(prePath+ item.cpath + ".js")
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
        console.log(item)

    		 return (
          <Route
            path={"/" + item.menuname}
            component={item.c}
            exact
            key={index}
          />
        );     
    });
};

export{
  f_getRoutes,
  renderComponent
}