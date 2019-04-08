import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading'
import  {createBrowserHistory as createHistory } from 'history'
import {message} from 'antd'

// 1. Initialize
const app = dva({
history:createHistory(),
...createLoading({
      effects: true
    }),
// onAction: middlewares,
  onError(err) {
  console.log(err)
  // err.preventDefault()
}
});


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


export default app