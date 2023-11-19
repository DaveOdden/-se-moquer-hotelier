const url = 'https://un-moquer-hotelier-api.vercel.app/api';
const apiPath = "/settings"

export const SettingsAPI = {
  get: async (id) => {
    let queryString = id ? `?id=${id}` : '';
    const response = await fetch(`${url}${apiPath}${queryString}`);
    let jsonResponse = await response.json();
    return jsonResponse;
  },
}