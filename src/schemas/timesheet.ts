import { z } from 'zod/v4'

const taskSchema = z.object({
  taskId: z.string(),
  name: z.string(),
  comment: z.string(),
  jiraIssue: z.string().optional(),
  categoryId: z.string(),
  duration: z.number(),
  startTime: z.string(),
  endTime: z.string()
})

const categoryAllocationSchema = z.object({
  categoryId: z.string(),
  allocation: z.number()
})

const timesheetSchema = z.object({
  timesheetId: z.string(),
  date: z.string(),
  user: z.string(),
  workTime: z.number(),
  comment: z.string(),
  tasks: z.array(taskSchema),
  categoryAllocations: z.array(categoryAllocationSchema)
})

export type Timesheet = z.infer<typeof timesheetSchema>
export type Task = z.infer<typeof taskSchema>

export { timesheetSchema }
