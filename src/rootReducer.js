// combines all reducers
import { combineReducers } from 'redux';
import {createResponsiveStateReducer} from 'redux-responsive';
import { 
  errorReducer, 
  authReducer, 
  navigationReducer, 
  createNoteFormReducer, 
  renderNotesReducer, 
  modalReducer,
  createNoteFormButtonsReducer,
  personsInputsReducer,
  noteMenuReducer } from './reducers';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   nav: navigationReducer,
   noteForm: createNoteFormReducer,
   renderNotes: renderNotesReducer,
   modal: modalReducer,
   noteFormButtons: createNoteFormButtonsReducer,
   personsInputs: personsInputsReducer,
   menu: noteMenuReducer, 
   browser: createResponsiveStateReducer({
   	extraSmall: 480,
    small: 559,
    medium: 768,
    large: 960,
   })
});