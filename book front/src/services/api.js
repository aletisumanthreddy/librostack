import axios from 'axios';

export default axios.create({
  baseURL: 'https://desirable-generosity-production.up.railway.app/',
});
// You can change the baseURL to your API server's URL
// For production, you might want to use an environment variable or a config file