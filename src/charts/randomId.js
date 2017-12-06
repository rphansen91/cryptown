function byteToHex(byte) {
  return ('0' + byte.toString(16)).slice(-2);
}

export function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return [].map.call(arr, byteToHex).join("");
}

export default name => `${name}-${generateId(20)}`
