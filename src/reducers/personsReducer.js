import { GET_ALL_PERSONS } from '../actions/actionTypes';

const initialState = {
	persons: []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_ALL_PERSONS:
			return {
				...state,
				persons: [...action.persons]
			}
		default:
			return state;
	}
}