import axios from 'axios';

const prodUrl = 'https://my-recsys.herokuapp.com';
const devUrl = 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? prodUrl : devUrl
});

export default apiClient;