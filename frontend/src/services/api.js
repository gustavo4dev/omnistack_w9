import axios from 'axios';

const api = axios.create({
    baseURL: "https://serene-springs-15445.herokuapp.com/:3333",
});


export default api;