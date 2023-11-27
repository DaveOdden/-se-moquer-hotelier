
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

export const transformDataForDescription = (guest) => {
  let descriptionContent = [];
  const loopOverProperties = dataObj => {
    let index = 0;
    for(const key in dataObj) {
      if(typeof dataObj[key] != "object") {
        descriptionContent.push({
          key: index,
          label: key,
          children: dataObj[key]
        })
        index++
      } else {
        loopOverProperties(dataObj[key])
      }
    }
  }
  loopOverProperties(guest)
  return descriptionContent
}