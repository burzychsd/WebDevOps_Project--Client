import { 
	NOTE_MENU_RECOVERYBTN,
	NOTE_MENU_DELETEBTN,
	NOTE_MENU_CURRENT,
	NOTE_MENU_ACTIVE,
	NOTE_MENU_UPDATEBTN, 
	NOTE_MENU_ARCHIVEBTN, 
	NOTE_MENU_BINBTN, 
	NOTE_MENU_ITEMS_RESET } from '../actions/actionTypes';

const initialState = {
	updateBtn: false,
	archiveBtn: false,
	binBtn: false,
	recoveryBtn: false,
	deleteBtn: false,
	isActive: {},
	current: null
};

export default function(state = initialState, action) {
	switch(action.type) {
			case NOTE_MENU_CURRENT:
				return {
					...state,
					current: action.id
				}
			case NOTE_MENU_ACTIVE:
				const newObj = state.isActive;
				newObj[action.id] = !newObj[action.id];
				return {
					...state,
					isActive: {
						...newObj
					}
				}
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
			case NOTE_MENU_RECOVERYBTN:
				return {
					...state,
					recoveryBtn: !state.recoveryBtn
				}
			case NOTE_MENU_DELETEBTN:
				return {
					...state,
					deleteBtn: !state.deleteBtn
				}
			case NOTE_MENU_ITEMS_RESET:
				return {
					...state,
					updateBtn: false,
					archiveBtn: false,
					binBtn: false,
					recoveryBtn: false,
					deleteBtn: false
				}
		default:
			return state;
	}
}