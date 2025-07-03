import { Heading, Text } from '@forge/react'
import React, { useState } from 'react'
import DurationPicker from '../components/duration-picker'

export default function SummaryPage() {
  const [time, setTime] = useState(75)
  return (
    <>
      <Heading>Summary Page</Heading>
      <Text>This will be the summary page</Text>
      <DurationPicker maxMins={480} value={time} onChange={setTime} />
    </>
  )
}
