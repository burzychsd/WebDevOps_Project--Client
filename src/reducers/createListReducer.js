import { LIST_STATUS, RESET_LIST_STATUS } from '../actions/actionTypes';

const initialState = {
	listStatus: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case LIST_STATUS:
			return {
				...state,
				listStatus: true
			}
		case RESET_LIST_STATUS:
			return {
				...state,
				listStatus: false
			}
		default: 
			return state;
	}
}