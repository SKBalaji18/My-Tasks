import './index.css'

const Tasks = props => {
  const {eachItem} = props
  const {taskName, taskCategory} = eachItem

  const taskCategoryDisplay =
    taskCategory[0] + taskCategory.slice(1).toLowerCase()
  return (
    <li className="task-item">
      <p className="task-name">{taskName}</p>
      <p className="task-cat">{taskCategoryDisplay}</p>
    </li>
  )
}

export default Tasks
