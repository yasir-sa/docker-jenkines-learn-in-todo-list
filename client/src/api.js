import axios from 'axios';

// Axios Instance உருவாக்கி அதிலேயே Base URL-ஐ காமனாக செட் செய்கிறோம்
const API = axios.create({
    baseURL: 'http://localhost:5000/api/todo'
});

export default API;