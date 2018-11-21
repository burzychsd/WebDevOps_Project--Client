import axios from 'axios';
import qs from 'qs';

export const createNote = (note) => dispatch => {
	axios.post('/api/notes', qs.stringify(note))
	.then(res => console.log(res.data))
	.catch(err => console.log(err));
};