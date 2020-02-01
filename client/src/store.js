import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducer from './reducer.js';

const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));

export default store;
