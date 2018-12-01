import client from '../axios';
import qs from 'qs';

export const createNote = (note) => dispatch => {
	client.post('/api/notes', qs.stringify(note))
	.then(res => console.log(res.data))
	.catch(err => console.log(err));
};