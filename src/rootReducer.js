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
  noteMenuReducer,
  updateNotesReducer,
  personsReducer,
  alarmTimerReducer } from './reducers';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   nav: navigationReducer,
   noteForm: createNoteFormReducer,
   renderNotes: renderNotesReducer,
   modal: modalReducer,
   noteFormButtons: createNoteFormButtonsReducer,
   personsInputs: personsInputsReducer,
   persons: personsReducer,
   menu: noteMenuReducer,
   update: updateNotesReducer,
   timer: alarmTimerReducer, 
   browser: createResponsiveStateReducer({
   	extraSmall: 480,
    small: 559,
    medium: 768,
    large: 960,
   })
});