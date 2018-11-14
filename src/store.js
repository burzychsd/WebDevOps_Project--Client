// store of our app
import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const inititalState = {};

const store = createStore(
        rootReducer, 
        inititalState, 
        compose(
        	responsiveStoreEnhancer,
        	applyMiddleware(thunk), 
                window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;