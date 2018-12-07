import { ALARM_TIMER, ALARM_STATUS } from '../actions/actionTypes';

const initialState = {
	alarmTimer: '',
	alarmStatus: true
}

export default function(state = initialState, action ) {
	switch(action.type) {
		case ALARM_TIMER:
			return {
				...state,
				alarmTimer: action.timer
			}
		case ALARM_STATUS:
			return {
				...state,
				alarmStatus: !state.alarmStatus
			}
		default:
			return state;
	}
}