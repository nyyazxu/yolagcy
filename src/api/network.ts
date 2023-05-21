import axios from 'axios';

const BASE_URL = 'http://192.168.1.34:1919';

const api = axios.create({baseURL: BASE_URL});

export default api;
export {BASE_URL};
