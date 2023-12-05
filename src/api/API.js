import { apiUrl, apiKey } from './constants'

const isRegularGetRequest = config => config.method === "GET" && config.payload == undefined && config.id === undefined
const isGetRequestWithPayload = config => config.method === "GET" && config.payload
const prependQuestionMark = string => '?' + string.substring(1, string.length)

const dynamicallyAssembleQueryStringPartial = payload => {
  let partialQueryString = ''
  Object.keys(payload).forEach(function(key, index) {
    partialQueryString += `&${key}=${payload[key]}`
  });
  return partialQueryString
}

const assembleQueryString = (config) => {
  let queryString = ''

  if(isRegularGetRequest(config))
    return ''

  if(isGetRequestWithPayload(config))
    queryString += dynamicallyAssembleQueryStringPartial(config.payload)

  if(config.id)
    queryString += `&id=${config.id}`

  return prependQuestionMark(queryString)
}

export const AppAPI = {
  call: async (config) => {
    let queryString = assembleQueryString(config)
    const response = await fetch(`${apiUrl}${config.endpoint}${queryString}`,{
      method: config.method,
      body: config.payload && config.method !== 'GET' ? JSON.stringify(config.payload) : null,
      headers: new Headers({
        'Authorization': apiKey, 
      }), 
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
}

/* NOTES

GET requests with a passed in "payload" get turned into query strings

e.g.:

{
  method: 'GET',
  endpoint: '/guests',
  id: 652a002a84fd6cdd03be4d0f,
  payload: {
    checkinDate: 2023-12-10T15:30:00.000Z,
    checkoutDate: 2023-12-17T15:30:00.000Z,
  }
}

gets transformed into an api ready uri:

/guests?checkinDate=2023-12-10T15:30:00.000Z&checkoutDate=2023-12-17T15:30:00.000Z&id=652a002a84fd6cdd03be4d0f

*/