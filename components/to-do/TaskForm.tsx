import { FC, useState } from "react"
import { TaskProps } from "./Task"

type TaskFormProps = {
  createTask?: (task: TaskProps) => void
}

const TaskForm: FC<TaskFormProps> = ({ createTask }) => {
  const [name, setName] = useState<string>("")

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        createTask && createTask({ name })
        setName("")
      }}
    >
      <input
        type="text"
        value={name}
        onChange={event => {
          setName(event.target.value)
        }}
        data-cy="TaskFormInput"
      />
      <input type="submit" value="criar" data-cy="TaskFormButton" />
    </form>
  )
}

export default TaskForm
