const url = 'https://un-moquer-hotelier-api.vercel.app/api';
const apiPath = "/guests"
const apikey = import.meta.env.VITE_VERCEL_API_KEY

export const GuestAPI = {
  get: async () => {
    const response = await fetch(`${url}${apiPath}`,{
      headers: new Headers({
        'Authorization': apikey, 
      }), 
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  getOne: async (id) => {
    let queryString = id ? `?id=${id}` : '';
    const response = await fetch(`${url}/getOneGuest${queryString}`,{
      headers: new Headers({
        'Authorization': apikey, 
      }), 
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  getGuestsForAutocomplete: async () => {
    const response = await fetch(`${url}/getGuestsForAutocomplete`,{
      headers: new Headers({
        'Authorization': apikey, 
      }), 
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  post: async (data) => {
    const response = await fetch(`${url}${apiPath}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        'Authorization': apikey, 
      }),
    });
    if(response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  },
  update: async (id, payload) => {
    const response = await fetch(`${url}${apiPath}?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: new Headers({
        'Authorization': apikey, 
      }),
    });
    if(response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  },
  delete: async (id) => {
    const response = await fetch(`${url}${apiPath}?id=${id}`, {
      method: "DELETE",
      headers: new Headers({
        'Authorization': apikey, 
      }),
    });
    if(response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  }
}