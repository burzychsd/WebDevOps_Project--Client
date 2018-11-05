// combines all reducers
import { combineReducers } from 'redux';
import { errorReducer, authReducer, navigationReducer } from './reducers';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   nav: navigationReducer
});