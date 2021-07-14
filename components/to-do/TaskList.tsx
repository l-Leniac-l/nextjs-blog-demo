import Task from "./Task"
import TaskForm from "./TaskForm"
import { useTaskList } from "./useTaskList"

const TaskList = () => {
  const [list, createTask, toggleTask, removeTask] = useTaskList()

  return (
    <div>
      <h1>Lista</h1>
      {!!list.length && (
        <ul data-cy="TaskList">
          {list.map(task => (
            <Task
              {...task}
              key={task.id}
              onToggle={toggleTask}
              onRemove={removeTask}
            />
          ))}
        </ul>
      )}
      <TaskForm createTask={createTask} />
    </div>
  )
}

export default TaskList
