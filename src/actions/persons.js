import { GET_ALL_PERSONS } from './actionTypes';
import client from '../axios';

export const getPersons = () => dispatch => {
	const url = '/api/persons';

	client.get(url)
	.then(res => dispatch({
		type: GET_ALL_PERSONS,
		persons: res.data
	}))
	.catch(err => console.log(err));
}