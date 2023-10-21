
export const GuestAPI = {
  get: async () => {
    const response = await fetch(`https://se-moquer-hotelier-api.vercel.app/api/guests`);
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  post: async (data) => {
    const response = await fetch(`https://se-moquer-hotelier-api.vercel.app/api/guests`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if(response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  },
  update: async (id) => {
    const response = await fetch(`https://se-moquer-hotelier-api.vercel.app/api/guests?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    if(response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  },
  delete: async (id) => {
    const response = await fetch(`https://se-moquer-hotelier-api.vercel.app/api/guests?id=${id}`, {
      method: "DELETE",
    });
    if(response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  }
}