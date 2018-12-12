import { SEARCHBOX_ACTIVE } from '../actions/actionTypes';

const initialState = {
	searchBox: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SEARCHBOX_ACTIVE:
			return {
				...state,
				searchBox: !state.searchBox
			}
		default:
			return state;
	}
}