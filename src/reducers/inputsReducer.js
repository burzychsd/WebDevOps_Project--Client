import { ADD_INPUT, REMOVE_INPUT, REMOVE_ALL_INPUTS } from '../actions/actionTypes';

const id = '_id' + Math.random();

const initialState = {
	arrOfInputs: [],
	listItems: []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_INPUT:
			return {
				...state,
				listItems: state.listItems.concat(action.payload)
			}
		case REMOVE_INPUT:
			const filtered = state.listItems.filter(el => el !== action.payload);
			return {
				...state,
				listItems: filtered
			}
		case REMOVE_ALL_INPUTS:
			return {
				...state,
				arrOfInputs: [id],
				listItems: []
			}	
		default:
			return state;
	}
}