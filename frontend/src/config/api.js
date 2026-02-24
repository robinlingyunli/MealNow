import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5454";


export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});


