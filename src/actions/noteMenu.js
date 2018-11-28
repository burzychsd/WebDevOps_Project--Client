import {  
	NOTE_MENU_UPDATEBTN, 
	NOTE_MENU_ARCHIVEBTN, 
	NOTE_MENU_BINBTN, 
	NOTE_MENU_ITEMS_RESET } from './actionTypes';

export const updateBtnStatus = () => {
	return {
		type: NOTE_MENU_UPDATEBTN
	}
}

export const archiveBtnStatus = () => {
	return {
		type: NOTE_MENU_ARCHIVEBTN
	}
}

export const binBtnStatus = () => {
	return {
		type: NOTE_MENU_BINBTN
	}
}

export const noteMenuItemsReset = () => {
	return {
		type: NOTE_MENU_ITEMS_RESET
	}
}