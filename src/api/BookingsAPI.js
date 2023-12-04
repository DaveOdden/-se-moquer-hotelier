const url = 'https://un-moquer-hotelier-api.vercel.app/api';
const apiPath = "/bookings"
const roomPath = "/bookingsByRoom"
const apikey = import.meta.env.VITE_VERCEL_API_KEY

export const BookingsAPI = {
  get: async (key, val) => {
    let queryString = key ? `?${key}=${val}` : '';
    const response = await fetch(`${url}${apiPath}${queryString}`, {
      headers: new Headers({
        'Authorization': apikey,
      }),
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  post: async (data) => {
    const response = await fetch(`${url}${apiPath}`,  {
      headers: new Headers({
        'Authorization': apikey,
      }),
    });
    if (response.status === 200) {
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
    if (response.status === 200) {
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
    if (response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  },
  getRoomsByAvailability: async (checkinDate, checkoutDate) => {
    let queryString = checkinDate && checkoutDate ? `?checkin=${checkinDate}&checkout=${checkoutDate}` : '';
    const response = await fetch(`${url}/getRoomsByAvailability${queryString}`,{
      headers: new Headers({
        'Authorization': apikey, 
      }), 
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
}

export const BookingsByRoomAPI = {
  get: async (key, val) => {
    let queryString = val ? `?${key}=${val}` : '';
    const response = await fetch(`${url}${roomPath}${queryString}`,{
      headers: new Headers({
        'Authorization': apikey, 
      }), 
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
}