import { Status, TodoItem, Urgency } from "./private-module.interfaces"

export const statusValues: Status[] = ['BACKLOG','TODO','DONE']
export const urgencyValues: Urgency[] = ['NO PRIORITY','MEDIUM','URGENT']

export const todoExampleItems: TodoItem[] = [
    {
      title: 'Hard Item',
      subtitle: 'Hard Subtitle',
      text: 'Hard Text',
      status: "BACKLOG",
      urgency: "NO PRIORITY"
    },
    {
      title: 'Urgent Item',
      subtitle: 'Urgent Subtitle',
      text: 'Urgent Text',
      status: "BACKLOG",
      urgency: "URGENT"
    },
    {
      title: 'Medium Item',
      subtitle: 'Medium Subtitle',
      text: 'Medium Text',
      status: "TODO",
      urgency: "MEDIUM"
    }
  ]