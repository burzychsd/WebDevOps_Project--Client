import { CREATE_NOTE_FORM } from './actionTypes';

export const showForm = () => {
	return {
		type: CREATE_NOTE_FORM,
		payload: false
	}
}