import axios from "axios";

const instance = axios.create({
  baseURL: '', // Empty base URL lets the proxy handle it
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;