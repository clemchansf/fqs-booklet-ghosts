import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import Redux, {combineReducers, createStore} from 'redux';
import quiz from './reducers/quiz.js';


// const reducers = combineReducers({
//     user: userReducer,
//     tweets: tweetsReducer,
// })

const reducers = combineReducers({
   quiz,
})

const store = createStore(reducers)

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);
