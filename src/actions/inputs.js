import { ADD_INPUT, REMOVE_INPUT, REMOVE_ALL_INPUTS } from './actionTypes';

export const addInput = () => {
	const id = '_id' + Math.random();
	return {
		type: ADD_INPUT,
		payload: id
	}
}

export const removeInput = (key) => {
	return {
		type: REMOVE_INPUT,
		payload: key
	}
}

export const removeAllInputs = () => {
	return {
		type: REMOVE_ALL_INPUTS
	}
}