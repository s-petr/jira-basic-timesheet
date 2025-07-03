import { invoke } from '@forge/bridge'
import {
  CodeBlock,
  DatePicker,
  DynamicTable,
  Heading,
  Inline,
  Label,
  Stack,
  Text,
  Textfield
} from '@forge/react'
import React, { useEffect, useState } from 'react'
import { Timesheet, timesheetSchema } from '../../schemas/timesheet'
import DurationPicker from '../components/duration-picker'
import InlineEditText from '../components/inline-edit-text'

export default function TimesheetPage() {
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null)

  const [categoryTime1, setCategoryTime1] = useState(30)
  const [categoryTime2, setCategoryTime2] = useState(245)
  const [categoryTime3, setCategoryTime3] = useState(99)

  useEffect(() => {
    invoke('getTimesheet').then((res) => {
      const timesheetParsed = timesheetSchema.safeParse(res)
      timesheetParsed.success && setTimesheet(timesheetParsed.data)
    })
  }, [])

  const tasksTableHead = {
    cells: [
      {
        key: 'name',
        content: 'Task Name',
        isSortable: true
      },
      {
        key: 'category',
        content: 'Task Category',
        isSortable: true
      },
      {
        key: 'startTime',
        content: 'endTime',
        isSortable: true
      },
      {
        key: 'endTime',
        content: 'End Time',
        isSortable: true
      },
      {
        key: 'duration',
        content: 'Duration',
        isSortable: true
      }
    ]
  }

  const tasksTableRows =
    timesheet &&
    timesheet.tasks.length &&
    timesheet.tasks.map((task, index) => ({
      key: `row-${index}`,
      cells: [
        {
          key: 'name',
          content: <InlineEditText value={task.name} />
        },
        {
          key: 'category',
          content: task.categoryId
        },
        {
          key: 'startTime',
          content: task.startTime
        },
        {
          key: 'endTime',
          content: task.endTime
        },
        {
          key: 'duration',
          content: task.duration
        }
      ]
    }))

  const categoriesTableHead = {
    cells: [
      {
        key: 'category',
        content: 'Category',
        isSortable: true
      },
      {
        key: 'allocation',
        content: 'Time Allocation (%)',
        isSortable: true
      }
    ]
  }
  const categoriesTableRows = [
    {
      key: 'row-1',
      cells: [
        {
          key: 'category',
          content: 'External communication'
        },
        {
          key: 'allocation',
          content: (
            <DurationPicker
              value={categoryTime1}
              maxMins={timesheet?.workTime || 1440}
              onChange={setCategoryTime1}
            />
          )
        }
      ]
    },
    {
      key: 'row-2',
      cells: [
        {
          key: 'development',
          content: 'Development'
        },
        {
          key: 'allocation',
          content: (
            <DurationPicker
              value={categoryTime2}
              maxMins={timesheet?.workTime || 1440}
              onChange={setCategoryTime2}
            />
          )
        }
      ]
    },
    {
      key: 'row-3',
      cells: [
        {
          key: 'category',
          content: 'Unstructured Time'
        },
        {
          key: 'allocation',
          content: (
            <DurationPicker
              value={categoryTime3}
              maxMins={timesheet?.workTime || 1440}
              onChange={setCategoryTime3}
            />
          )
        }
      ]
    }
  ]

  return (
    timesheet && (
      <Stack space='space.200'>
        <Heading>Timesheet</Heading>

        <Inline space='space.200'>
          <Stack>
            <Label labelFor='selected-date'>Selected Date</Label>
            <DatePicker id='selected-date' value={timesheet.date} />
          </Stack>

          <Stack>
            <Label labelFor='duration'>Total Work Hours</Label>
            <Textfield id='duration' value={timesheet.workTime} />
          </Stack>
        </Inline>

        {tasksTableRows && (
          <DynamicTable
            head={tasksTableHead}
            rows={tasksTableRows}
            caption='Tasks List'
          />
        )}

        <Text size='large' weight='medium'>
          Category Breakdown
        </Text>
        {categoriesTableRows && (
          <DynamicTable
            head={categoriesTableHead}
            rows={categoriesTableRows}
            caption='Tasks List'
          />
        )}

        <Text size='large' weight='medium'>
          Data Structure
        </Text>
        <CodeBlock language='JSON' text={JSON.stringify(timesheet, null, 2)} />
      </Stack>
    )
  )
}
