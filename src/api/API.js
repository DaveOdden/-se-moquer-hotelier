import { apiUrl, apiKey } from './constants'

const ifIsARegularGetRequest = config => config.method === "GET" && config.payload == undefined && config.id === undefined
const ifIsAGetRequestWithPayload = config => config.method === "GET" && config.payload
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

  if(ifIsARegularGetRequest(config))
    return ''

  if(ifIsAGetRequestWithPayload(config))
    queryString += dynamicallyAssembleQueryStringPartial(config.payload)

  if(config.id)
    queryString += `&id=${config.id}`

  return prependQuestionMark(queryString)
}

export const AppAPI = {
  call: async (config) => {
    console.log(config)
    let queryString = assembleQueryString(config)
    console.log(queryString)
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