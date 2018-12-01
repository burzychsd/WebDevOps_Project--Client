import client from '../axios';
import { RENDER_NOTES, UPDATE_NOTES } from './actionTypes';

export const renderNotes = () => dispatch => {
	client.get('/api/notes')
	.then(res => dispatch({
		type: RENDER_NOTES,
		newNote: res.data
	}))
	.catch(err => console.log(err));
}

export const updateNotes = (id) => {
	return {
		type: UPDATE_NOTES,
		id
	}
}