let count = 0
export function generateId(len) {
  return count++
}

export default () => `${generateId(20)}`
