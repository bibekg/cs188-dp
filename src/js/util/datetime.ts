export const parseExifDateTime = (exifDateTime: string): Date | null => {
  const [datePart, timePart] = exifDateTime.split(' ')
  const [year, month, date] = datePart.split(':').map(x => +x)
  const [hour, minute, second] = timePart.split(':').map(x => +x)

  const d = new Date()
  d.setFullYear(year, month - 1, date)
  d.setHours(hour)
  d.setMinutes(minute)
  d.setSeconds(second)

  return d.toString() === 'Invalid Date' ? null : d
}

export const TIME_REGEXP = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
