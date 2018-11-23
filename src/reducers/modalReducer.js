import { SHOW_MODAL } from '../actions/actionTypes';

const initialState = {
	showModal: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SHOW_MODAL:
			return {
				...state,
				showModal: !state.showModal
			}
		default:
			return state;
	}
}