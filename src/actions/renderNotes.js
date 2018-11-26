import axios from 'axios';
import { RENDER_NOTES } from './actionTypes';

export const renderNotes = () => dispatch => {
	axios.get('/api/notes')
	.then(res => dispatch({
		type: RENDER_NOTES,
		newNote: res.data
	}))
	.catch(err => console.log(err));
}