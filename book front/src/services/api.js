import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080',
});
// You can change the baseURL to your API server's URL
// For production, you might want to use an environment variable or a config file