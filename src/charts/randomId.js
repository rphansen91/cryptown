let count = 0
export function generateId(len) {
  return count++
}

export default name => `${name}-${generateId(20)}`
