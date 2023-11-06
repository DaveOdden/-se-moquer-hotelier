export function removeFirstChar(string) {
  return string.slice(1,string.length);
}
export function depluralize(string) {
  return string.slice(0,string.length-1);
}

// export function transformDataForDescription() {
//   let descriptionContent = [];
//   function loopOverProperties(dataObj) {
//     let index = 0;
//     for(const key in dataObj) {
//       if(typeof dataObj[key] != "object") {
//         descriptionContent.push({
//           key: index,
//           label: key,
//           children: dataObj[key]
//         })
//         index++
//       } else {
//         loopOverProperties(dataObj[key])
//       }
//     }
//   }
// }