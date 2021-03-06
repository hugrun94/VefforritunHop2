import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';

import rootReducer from './reducers'
import App from './App';
import './index.css';

const initialState={};

/* verkefni sett upp til að styðja async actions í redux */
const store = createStore(
  rootReducer,
  initialState,
  compose(
	  applyMiddleware(thunk),
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
export default store;
