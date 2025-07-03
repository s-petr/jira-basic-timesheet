import { TimePicker } from '@forge/react'
import React from 'react'

/* const isValid15MinuteIncrement = (time: string) => {
  const minutes = Number(time.split(':')[1])
  return minutes % 15 === 0
} */

const timeToMinutes = (time: string) => {
  const [hours = 0, minutes = 0] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const minutesToTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

const snapTo15Minutes = (totalMinutes: number) => {
  return Math.round(totalMinutes / 15) * 15
}

const generateTimes = (minMins: number, maxMins: number) => {
  minMins = snapTo15Minutes(minMins)
  maxMins = snapTo15Minutes(maxMins)

  if (minMins > maxMins)
    throw new Error('minTime must be less than or equal to maxTime')
  if (minMins < 0 || maxMins > 1440)
    throw new Error('Times must be between 00:00 and 24:00')

  const times = []
  let currentMinutes = Math.ceil(minMins / 15) * 15

  while (currentMinutes <= maxMins) {
    times.push(minutesToTime(currentMinutes))
    currentMinutes += 15
  }

  return times
}

export default function DurationPicker({
  value,
  minMins = 15,
  maxMins = 1440,
  onChange
}: {
  value: number
  minMins?: number
  maxMins?: number
  onChange?: (value: number) => void
}) {
  const parseMinuteInput = (totalMinutes: number) => {
    let output = totalMinutes
    if (totalMinutes < minMins) output = minMins
    if (totalMinutes > maxMins) output = maxMins
    return minutesToTime(snapTo15Minutes(output))
  }

  const handleChange = (data: string) => {
    const selectedMinutes = timeToMinutes(data)
    const snappedMinutes = snapTo15Minutes(selectedMinutes)
    onChange?.(snappedMinutes)
  }

  return (
    <TimePicker
      id='time-picker'
      timeFormat='HH:mm'
      placeholder='HH:mm'
      locale='en-US'
      times={generateTimes(minMins, maxMins)}
      value={parseMinuteInput(value)}
      onChange={handleChange}
    />
  )
}
