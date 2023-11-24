
export const convertFormDataForAPI = formData => {
  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    dob: formData.dob,
    licenseNumber: formData.licenseNumber,
    address: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip
    },
    currentlyAssignedRoom: "",
    status: "good",
    storedCreditCard: {},
    history: [],
    signUpDate: new Date(),
  }
}