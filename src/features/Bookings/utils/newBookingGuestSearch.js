
export const onGuestSearch = (searchTerms, dataSet) => {
  let hasMatch = false;
  for (const el of dataSet) {
    let hasValueMatch, hasLabelMatch = false;
    hasLabelMatch = el.label.indexOf(searchTerms) !== -1 ? true : false
    hasValueMatch = el.value.indexOf(searchTerms) !== -1 ? true : false
    if(hasLabelMatch || hasValueMatch) {
      return hasMatch
      break;
    }
  }
  if(!hasMatch) {
    return null
  }
}