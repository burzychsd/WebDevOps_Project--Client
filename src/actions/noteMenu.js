import { 
	NOTE_MENU_REMINDERSBTN,
	NOTE_MENU_RECOVERYBTN,
	NOTE_MENU_CURRENT,
	NOTE_MENU_ACTIVE,
	NOTE_MENU_UPDATEBTN, 
	NOTE_MENU_ARCHIVEBTN, 
	NOTE_MENU_BINBTN,
	NOTE_MENU_DELETEBTN, 
	NOTE_MENU_ITEMS_RESET } from './actionTypes';

export const updateBtnStatus = () => {
	return {
		type: NOTE_MENU_UPDATEBTN
	}
}

export const deleteBtnStatus = () =>  {
	return {
		type: NOTE_MENU_DELETEBTN
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

export const recoveryBtnStatus = () => {
	return {
		type: NOTE_MENU_RECOVERYBTN
	}
}

export const remindersBtnStatus = () => {
	return {
		type: NOTE_MENU_REMINDERSBTN
	}
}

export const noteMenuItemsReset = () => {
	return {
		type: NOTE_MENU_ITEMS_RESET
	}
}

export const noteMenuActive = (e, id) => {
	return {
		type: NOTE_MENU_ACTIVE,
		id
	}
}

export const getCurrentNote = (id) => {
	return {
		type: NOTE_MENU_CURRENT,
		id
	}
}