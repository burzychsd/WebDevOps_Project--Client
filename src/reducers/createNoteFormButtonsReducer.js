import { ALARM_CLICKED, PERSONS_CLICKED, COLOR_CLICKED, RESET_CLICKED } from '../actions/actionTypes';

const initialState = {
	alarmBtn: false,
	personsBtn: false,
	colorBtn: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case ALARM_CLICKED:
			return {
				...state,
				alarmBtn: action.payload
			}
		case PERSONS_CLICKED:
			return {
				...state,
				personsBtn: action.payload
			}
		case COLOR_CLICKED:
			return {
				...state,
				colorBtn: action.payload
			}
		case RESET_CLICKED:
			return {
				...state,
				alarmBtn: action.payload,
				personsBtn: action.payload,
				colorBtn: action.payload
			}
		default:
			return state;
	}
}