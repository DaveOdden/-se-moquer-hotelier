export function removeFirstChar(string) {
  return string.slice(1,string.length);
}
export function depluralize(string) {
  return string.slice(0,string.length-1);
}
export function ellipsis(string) {
  return `${string}...`;
}