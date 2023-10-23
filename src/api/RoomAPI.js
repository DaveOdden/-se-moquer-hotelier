const url = 'https://un-moquer-hotelier-api.vercel.app/api';
const apiPath = "/rooms"

export const RoomsAPI = {
  get: async () => {
    const response = await fetch(`${url}${apiPath}`);
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