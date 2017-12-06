export const now = () => new Date().getTime()
export const iso = (time) => {
  if (time instanceof Date) return time.toISOString()

  const d = new Date()
  if (typeof time === 'number') {
    d.setTime(time)
    return d.toISOString()
  }
  return d.toISOString()
}
