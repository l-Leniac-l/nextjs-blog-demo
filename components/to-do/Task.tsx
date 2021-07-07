import { FC } from "react"

export type TaskProps = {
  id?: string
  name: string
  done?: boolean
  onToggle?: (id?: string) => void
  onRemove?: (id?: string) => void
}

const Task: FC<TaskProps> = ({ id, name, done, onToggle, onRemove }) => {
  return (
    <li>
      <label className={`task ${done && "checked"}`}>
        <input
          type="checkbox"
          checked={!!done}
          onClick={() => onToggle && onToggle(id)}
        />
        {name}
        <button onClick={() => onRemove && onRemove(id)}>Delete</button>
        <style jsx>
          {`
            .checked {
              text-decoration: line-through;
            }
          `}
        </style>
      </label>
    </li>
  )
}

export default Task
