import { ALARM_TIMER, ALARM_STATUS } from './actionTypes';
import moment from 'moment';

export const alarmTimer = () => {
	return {
		type: ALARM_TIMER,
		timer: moment().format().split('').splice(0, 16).join('')
	}
}

export const alarmStatus = () => {
	return {
		type: ALARM_STATUS
	}
}