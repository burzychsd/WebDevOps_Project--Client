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
  inputsReducer,
  noteMenuReducer,
  updateNotesReducer,
  personsReducer,
  alarmTimerReducer,
  createListReducer,
  searchBoxReducer } from './reducers';

const appReducer = combineReducers({
   errors: errorReducer,
   auth: authReducer,
   nav: navigationReducer,
   noteForm: createNoteFormReducer,
   renderNotes: renderNotesReducer,
   modal: modalReducer,
   noteFormButtons: createNoteFormButtonsReducer,
   inputs: inputsReducer,
   persons: personsReducer,
   menu: noteMenuReducer,
   update: updateNotesReducer,
   timer: alarmTimerReducer,
   list: createListReducer,
   search: searchBoxReducer, 
   browser: createResponsiveStateReducer({
   	extraSmall: 480,
    small: 559,
    medium: 768,
    large: 960,
   })
});

const rootReducer = (state, action) => {
  if (action.type === 'SET_CURRENT_USER' && Object.keys(action.payload).length === 0 ) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;