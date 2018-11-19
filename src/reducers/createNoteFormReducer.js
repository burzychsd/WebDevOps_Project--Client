import { SHOW_NOTE_FORM } from '../actions/actionTypes';

const initialState = {
	showForm: false
}

export default function(state = initialState, action) {
	switch (action.type) {
		case SHOW_NOTE_FORM:
			return {
				...state,
				showForm: !state.showForm
			}
		default:
			return state;
	}
}