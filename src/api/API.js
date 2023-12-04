import { apiUrl, apiKey } from './constants'

export const AppAPI = {
  call: async (config) => {
    let queryString = config.id ? `?id=${config.id}` : '';
    const response = await fetch(`${apiUrl}${config.endpoint}${queryString}`,{
      method: config.protocol,
      body: config.payload ? JSON.stringify(config.payload) : null,
      headers: new Headers({
        'Authorization': apiKey, 
      }), 
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
}