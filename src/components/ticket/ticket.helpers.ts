import { format, addMinutes } from 'date-fns'

export const itineraryDateRange = (date: string, duration: number) => {
  const formatDateFrom = (date: string) => format(new Date(date), 'HH:mm')
  const formatDateTo = (date: string, duration: number) => format(addMinutes(new Date(date), duration), 'HH:mm')

  return `${formatDateFrom(date)} - ${formatDateTo(date, duration)}`
}
export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч ${minutes}м`
}

export const stopsCount = (stops: string[]) => {
  const text = stops.length === 1 ? 'пересадка' : 'пересадки'
  return stops.length ? `${stops.length} ${text}` : 'Без пересадок'
}

export const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
export const stopsFormat = (stops: string[]) => {
  if (stops.length === 0) {
    return '-'
  }
  return stops.join(', ')
}
