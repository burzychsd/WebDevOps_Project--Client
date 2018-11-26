import { ADD_PERSON_INPUT, REMOVE_PERSON_INPUT, REMOVE_ALL_PERSON_INPUTS } from '../actions/actionTypes';

const id = '_id' + Math.random();

const initialState = {
	arrOfInputs: []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_PERSON_INPUT:
			return {
				...state,
				arrOfInputs: state.arrOfInputs.concat(action.payload)
			}
		case REMOVE_PERSON_INPUT:
			const filtered = state.arrOfInputs.filter(el => el !== action.payload);
			return {
				...state,
				arrOfInputs: filtered
			}
		case REMOVE_ALL_PERSON_INPUTS:
			return {
				...state,
				arrOfInputs: [id]
			}	
		default:
			return state;
	}
}