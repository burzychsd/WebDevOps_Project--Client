const axios = require('axios');

export const axiosInstance = axios.create({
	baseURL: 'https://webdevops-google-keep-alike.herokuapp.com',
	headers: {
		'Access-Control-Allow-Origin' : '*'
	}
});

