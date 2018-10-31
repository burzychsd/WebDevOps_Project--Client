// combines all reducers
import { combineReducers } from 'redux';
import { errorReducer, authReducer } from './reducers';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer
});