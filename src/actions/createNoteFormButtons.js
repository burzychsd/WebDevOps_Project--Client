import { ALARM_CLICKED, PERSONS_CLICKED, COLOR_CLICKED, RESET_CLICKED } from './actionTypes';

export const alarmClicked = () => {
	return {
		type: ALARM_CLICKED,
		payload: true
	}
}

export const personsClicked = () => {
	return {
		type: PERSONS_CLICKED,
		payload: true
	}
}

export const colorClicked = () => {
	return {
		type: COLOR_CLICKED,
		payload: true
	}
}

export const resetClicked = () => {
	return {
		type: RESET_CLICKED,
		payload: false
	}
}
