// import axios from 'axios';

// // Axios Instance உருவாக்கி அதிலேயே Base URL-ஐ காமனாக செட் செய்கிறோம்
// const API = axios.create({
//     baseURL: 'http://localhost:5000/api/todo'
// });

// export default API;
import axios from 'axios';

// baseURL-ஐ வெறும் '/' என்று கொடுத்தால், அது தற்போது ஆப் இயங்கும் 
// அதே URL-ஐ (Render URL) எடுத்துக்கொள்ளும்.
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/todo'
});

export default API;