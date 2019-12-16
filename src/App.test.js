import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducers from './redux';
import firebase from  'firebase';
import 'firebase/firestore';
import config from './config';

const store = createStore(
  rootReducers
)

firebase.initializeApp(config.firebase);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></ Provider>, div);
  //console.log(div.debug())
  ReactDOM.unmountComponentAtNode(div);
});
