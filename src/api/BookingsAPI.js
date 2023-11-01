const url = 'https://un-moquer-hotelier-api.vercel.app/api';
const apiPath = "/bookings"
const roomPath = "/bookingsByRoom"

export const BookingsAPI = {
  get: async (key, val) => {
    let queryString = key ? `?${key}=${val}` : '';
    const response = await fetch(`${url}${apiPath}${queryString}`);
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

export const BookingsByRoomAPI = {
  get: async (key, val) => {
    let queryString = val ? `?${key}=${val}` : '';
    const response = await fetch(`${url}${roomPath}${queryString}`);
    let jsonResponse = await response.json();
    return jsonResponse;
  },
}