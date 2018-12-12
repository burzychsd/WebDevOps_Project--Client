import client from '../axios';
import { RENDER_NOTES, UPDATE_NOTES, NO_MATCH } from './actionTypes';

export const renderNotes = (query) => dispatch => {

	const url = query && query !== '' ? `/api/notes?search=${query}` : '/api/notes';

	client.get(url)
	.then(res => dispatch({
		type: RENDER_NOTES,
		newNotes: res.data.notes,
		error: res.data.msg
	}))
	.catch(err => dispatch({
		type: NO_MATCH,
		error: err.response.data
	}));
}

export const updateNotes = (id) => {
	return {
		type: UPDATE_NOTES,
		id
	}
}