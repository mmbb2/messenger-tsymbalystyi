import {createStore, applyMiddleware } from 'redux';
import AuthReducer from './AuthReducer'
import {composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
 
export const store  = createStore(AuthReducer, composeWithDevTools(applyMiddleware(thunk)));