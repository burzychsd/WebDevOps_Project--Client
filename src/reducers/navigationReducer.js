import { NAVIGATION_ACTIVE } from '../actions/actionTypes';

const initialState = {
	isOpen: false
}

export default function(state = initialState, action) {
	switch (action.type) {
		case NAVIGATION_ACTIVE:
			return {
				...state,
				isOpen: !state.isOpen
			}
		default:
			return state;
	}
}