import axios from 'axios';
import qs from 'qs';
import { GET_ERRORS } from './actionTypes';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/register', qs.stringify(user))
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/login', qs.stringify(user))
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}