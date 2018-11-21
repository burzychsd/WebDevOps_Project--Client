// combines all reducers
import { combineReducers } from 'redux';
import {createResponsiveStateReducer} from 'redux-responsive';
import { errorReducer, authReducer, navigationReducer, createNoteFormReducer, renderNotesReducer } from './reducers';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   nav: navigationReducer,
   noteForm: createNoteFormReducer,
   renderNotes: renderNotesReducer,
   browser: createResponsiveStateReducer({
   	extraSmall: 480,
    small: 559,
    medium: 768,
    large: 960,
   })
});