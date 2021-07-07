import { useState } from "react"
import { v4 as uuidV4 } from "uuid"
import { TaskProps } from "./Task"

export function useTaskList() {
  const [list, setList] = useState<TaskProps[]>([])

  function createTask(task: TaskProps) {
    setList([
      ...list,
      {
        id: uuidV4(),
        ...task,
      },
    ])
  }

  function toggleTask(id?: string) {
    if (!id) {
      return
    }

    const tasks = list.map(task => {
      const updatedTask = task
      if (task.id === id) {
        updatedTask.done = !updatedTask.done
      }
      return updatedTask
    })

    setList(tasks)
  }

  function removeTask(id?: string) {
    if (!id) {
      return
    }
    setList(list.filter(task => task.id !== id))
  }

  return [list, createTask, toggleTask, removeTask] as const
}
