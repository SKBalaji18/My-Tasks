import {Component} from 'react'
import {v4} from 'uuid'

import Tasks from './components/Tasks'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    tasksList: [],
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTab: 'INITIAL',
  }

  submitForm = event => {
    event.preventDefault()

    const {inputTask, selectTag} = this.state
    const taskName = inputTask
    const taskCategory = selectTag
    const id = v4()
    const bgColor = false

    if (taskName.length !== 0) {
      this.setState(prevState => ({
        tasksList: [
          ...prevState.tasksList,
          {id, taskName, taskCategory, bgColor},
        ],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  changeTag = event => {
    this.setState({selectTag: event.target.value})
  }

  changeTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTab:
        prevState.activeTab === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {tasksList, inputTask, selectTag, activeTab} = this.state

    const filterTaskList =
      activeTab === 'INITIAL'
        ? tasksList
        : tasksList.filter(eachItem => eachItem.taskCategory === activeTab)

    return (
      <div className="bg-container">
        <div className="left-container">
          <h1 className="left-head">Create a task!</h1>
          <form onSubmit={this.submitForm}>
            <label htmlFor="task">Task</label>
            <input
              id="task"
              value={inputTask}
              type="text"
              onChange={this.changeTask}
              placeholder="Enter the task here"
              className="inputs"
            />
            <label htmlFor="tags">Tags</label>
            <select id="tags" value={selectTag} onChange={this.changeTag}>
              {tagsList.map(eachItem => (
                <option value={eachItem.optionId} key={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="form-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="right-head">Tags</h1>
          <ul className="tag-btn-container">
            {tagsList.map(eachItem => {
              const isActive = activeTab === eachItem.optionId
              const btnClass = isActive ? 'active-tag' : 'normal-tag'
              return (
                <li key={eachItem.optionId}>
                  <button
                    type="button"
                    value={eachItem.optionId}
                    onClick={this.onClickTag}
                    className={btnClass}
                  >
                    {eachItem.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="right-head">Tasks</h1>
          {filterTaskList.length === 0 ? (
            <div className="no-task-container">
              <p className="no-task">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks-container">
              {filterTaskList.map(eachItem => (
                <Tasks key={eachItem.id} eachItem={eachItem} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
