const url = 'https://un-moquer-hotelier-api.vercel.app/api';
const apiPath = "/guests"

export const GuestAPI = {
  get: async () => {
    const response = await fetch(`${url}${apiPath}`);
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  getOne: async (id) => {
    let queryString = id ? `?id=${id}` : '';
    const response = await fetch(`${url}/getOneGuest${queryString}`);
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  getGuestsForAutocomplete: async () => {
    const response = await fetch(`${url}/getGuestsForAutocomplete`);
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  post: async (data) => {
    const response = await fetch(`${url}${apiPath}`, {
      method: "POST",
      body: JSON.stringify(data)
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
      body: JSON.stringify(payload)
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
    });
    if(response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  }
}