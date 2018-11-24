import { ADD_PERSON_INPUT, REMOVE_PERSON_INPUT, REMOVE_ALL_PERSON_INPUTS } from './actionTypes';

export const addInput = () => {
	const id = '_id' + Math.random();
	return {
		type: ADD_PERSON_INPUT,
		payload: id
	}
}

export const removeInput = (key) => {
	return {
		type: REMOVE_PERSON_INPUT,
		payload: key
	}
}

export const removeAllInputs = () => {
	return {
		type: REMOVE_ALL_PERSON_INPUTS
	}
}