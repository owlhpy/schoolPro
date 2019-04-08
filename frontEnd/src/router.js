import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './modules/app/index';
import dynamic from "dva/dynamic";
import app from "./index.js";

function RouterConfig({ history,app }) {
	const IndexPage = dynamic({
    app,
    models: () => [
      import('./modules/app/model'),
    ],
    component: () => App,
  });
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
