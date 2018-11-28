import { 
	NOTE_MENU_UPDATEBTN, 
	NOTE_MENU_ARCHIVEBTN, 
	NOTE_MENU_BINBTN, 
	NOTE_MENU_ITEMS_RESET } from '../actions/actionTypes';

const initialState = {
	updateBtn: false,
	archiveBtn: false,
	binBtn: false
};

export default function(state = initialState, action) {
	switch(action.type) {
			case NOTE_MENU_UPDATEBTN:
				return {
					...state,
					updateBtn: !state.updateBtn
				}
			case NOTE_MENU_ARCHIVEBTN:
				return {
					...state,
					archiveBtn: !state.archiveBtn
				}
			case NOTE_MENU_BINBTN:
				return {
					...state,
					binBtn: !state.binBtn
				}
			case NOTE_MENU_ITEMS_RESET:
				return {
					...state,
					updateBtn: false,
					archiveBtn: false,
					binBtn: false
				}
		default:
			return state;
	}
}