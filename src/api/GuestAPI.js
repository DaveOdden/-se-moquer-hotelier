
export const GuestAPI = {
  get: async () => {
    const response = await fetch(`https://se-moquer-hotelier-api.vercel.app/api/guests`);
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  post: async (data) => {
    const response = await fetch(`https://se-moquer-hotelier-api.vercel.app/api/guestss`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    console.log(response.status);
    if(response.status === 200) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
    return response
  }
}