import { ALARM_TIMER, ALARM_STATUS } from '../actions/actionTypes';
import moment from 'moment';

const initialState = {
	alarmTimer: moment().format().split('').splice(0, 16).join(''),
	alarmStatus: true
}

export default function(state = initialState, action ) {
	switch(action.type) {
		case ALARM_TIMER:
			if(state.alarmTimer !== action.timer) {
				return {
					...state,
					alarmTimer: action.timer
				}
			} else {
				return state;
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