import { UPDATE_NOTE, GET_UPDATED_NOTES, REMOVE_NOTE, DELETE_NOTE } from './actionTypes'; 
import client from '../axios';
import qs from 'qs';

export const updateNote = (id, updatedNote, status) => dispatch => {
	const url1 = `/api/notes/archive/${id}`;
	const url2 = `/api/notes/reminders/${id}`;
	const url3 = `/api/notes/delete/${id}`;

	const url = status === 'archive' ? url1 : 
				status === 'reminders' ? url2 : url3;
	
	client.put(url, qs.stringify(updatedNote))
	.then(res => dispatch({
		type: UPDATE_NOTE,
		msg: res.data,
		status
	}))
	.catch(err => console.log(err));

}

export const deleteNote = (id) => dispatch => {
	const url = `/api/notes/${id}`;

	client.delete(url)
	.then(res => dispatch({
		type: DELETE_NOTE,
		id,
		msg: res.data
	}))
	.catch(err => console.log(err));
}

export const getUpdatedNotes = (status) => dispatch => {
	const url1 = '/api/notes/archive';
	const url2 = '/api/notes/reminders';
	const url3 = '/api/notes/delete';

	const url = status === 'archive' ? url1 : 
				status === 'reminders' ? url2 : url3;

	client.get(url)
	.then(res => dispatch({
		type: GET_UPDATED_NOTES,
		newNote: res.data,
		status
	}))
	.catch(err => console.log(err));
}

export const removeNote = (id, status) => {
	return {
		type: REMOVE_NOTE,
		id,
		status
	}
}