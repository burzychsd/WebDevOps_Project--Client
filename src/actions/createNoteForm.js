import { SHOW_NOTE_FORM, CLOSE_NOTE_FORM } from './actionTypes';

export const showForm = () => {
	return {
		type: SHOW_NOTE_FORM
	}
}

export const closeForm = () => {
	return {
		type: CLOSE_NOTE_FORM
	}
}