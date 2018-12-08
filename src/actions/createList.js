import { LIST_STATUS, RESET_LIST_STATUS } from './actionTypes';

export const listStatus = () => {
	return {
		type: LIST_STATUS
	}
}

export const resetListStatus = () => {
	return {
		type: RESET_LIST_STATUS
	}
}