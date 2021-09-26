// import { createStore } from 'redux'
// import reducer from '../reducer'
// import { composeWithDevTools } from 'redux-devtools-extension'

// export default createStore(reducer, composeWithDevTools());




// // 引入createStore创建store，引入applyMiddleware 来使用中间件
// import { createStore, applyMiddleware } from 'redux';
// // 引入所有的reducer
// import reducer from './../reducer';
// // 安装redux-devtools-extension的可视化工具。
// import { composeWithDevTools } from 'redux-devtools-extension'
// const initialState = {
//   menuName: ''
// }
// const configureStore = () => createStore(reducer, initialState);

// export default configureStore;


import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducer'

const configureStore = () => createStore(reducer, composeWithDevTools(applyMiddleware()));

export default configureStore;