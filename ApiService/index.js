//ApiService/index.js code 

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const signup = (data) => axios.post(`${BASE_URL}/signup`, data);
const login = (data) => axios.post(`${BASE_URL}/login`, data);

const ApiService = {
  signup,
  login,
};

export default ApiService;
