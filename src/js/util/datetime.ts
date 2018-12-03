export const parseExifDateTime = (exifDateTime: string): Date | null => {
  if (exifDateTime == null) return null
  const [datePart, timePart] = exifDateTime.split(' ')
  if (!Array.isArray(datePart) || !Array.isArray(timePart)) return null
  const [year, month, date] = datePart.split(':').map(x => +x)
  if (year == null || month == null || date == null) return null
  const [hour, minute, second] = timePart.split(':').map(x => +x)
  if (hour == null || month == null || second == null) return null

  const d = new Date()
  d.setFullYear(year, month - 1, date)
  d.setHours(hour)
  d.setMinutes(minute)
  d.setSeconds(second)

  return d.toString() === 'Invalid Date' ? null : d
}

export const TIME_REGEXP = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
