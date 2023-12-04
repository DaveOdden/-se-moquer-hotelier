const url = 'https://un-moquer-hotelier-api.vercel.app/api';
const apiPath = "/settings"
const apikey = import.meta.env.VITE_VERCEL_API_KEY

export const SettingsAPI = {
  get: async (id) => {
    let queryString = id ? `?id=${id}` : '';
    const response = await fetch(`${url}${apiPath}${queryString}`, {
      headers: new Headers({
        'Authorization': apikey,
      }),
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
}