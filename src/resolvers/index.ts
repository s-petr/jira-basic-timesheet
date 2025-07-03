import Resolver from '@forge/resolver'

const resolver = new Resolver()

const SAMPLE_TIMESHEET = {
  timesheetId: 'ts-xyz-001',
  date: '2025-07-02',
  user: 'user-abc',
  workTime: 510,
  comment: 'Comments about the day.',
  tasks: [
    {
      taskId: 'task-01',
      name: 'Implement login page',
      comment: 'Used new UI components.',
      jiraIssue: 'https://jira.example.com/browse/PROJ-101',
      categoryId: 'cat-123',
      duration: 4,
      startTime: '09:00',
      endTime: '13:00'
    },
    {
      taskId: 'task-02',
      name: 'Attend team sync',
      comment: '',
      categoryId: 'cat-456',
      duration: 1,
      startTime: '14:00',
      endTime: '15:00'
    }
  ],
  categoryAllocations: [
    {
      categoryId: 'cat-123',
      allocation: 90
    },
    {
      categoryId: 'cat-456',
      allocation: 225
    }
  ]
}

resolver.define('getTimesheet', () => {
  return SAMPLE_TIMESHEET
})

export const handler = resolver.getDefinitions()
