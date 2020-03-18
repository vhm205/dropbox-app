import axios from 'axios';

export const call = axios.create({
	baseURL: 'http://localhost:1002/dropbox',
	url: 'http://localhost:1002/',
	responseType: 'json'
})
