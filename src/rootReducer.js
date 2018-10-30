// combines all reducers
import { combineReducers } from 'redux';
import errorReducer from './reducers';

export default combineReducers({
   errors: errorReducer
});