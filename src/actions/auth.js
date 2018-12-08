import client from '../axios';
import qs from 'qs';
import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    client.post('/api/register', qs.stringify(user))
            .then(res => history.push('/login'))
            .catch(err => {
                const response = err.response;
                dispatch({
                    type: GET_ERRORS,
                    payload: response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    client.post('/api/login', qs.stringify(user))
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(error => {
                const response = error.response;
                dispatch({
                    type: GET_ERRORS,
                    payload: response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    if(history) {
        history.push('/login');
    } else {
        window.location.href = '/login';
    }
}