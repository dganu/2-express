let { tasks } = require('./tasks')

const getTasks = (req, res) => {
  res.status(200).json({ success: true, data: tasks })
}

const createTask = (req, res) => {
  const {text,day,reminder,id,status} = req.body
  console.log(text)
  if (!text) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide text for Task ' })
  }
  const task = {
    text:text,
    day:day,
    reminder:reminder,
    id:id,
    status:status
  }
  const newTask = [...tasks,task]
  res.status(201).send({ success: true, task: newTask })
}


const updateTask = (req, res) => {
  const { id } = req.params
  const { reminder } = req.body

  const task = tasks.find((task) => task.id === Number(id))

  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `no tasks with id ${id}` })
  }
  const newTasks = tasks.map((task) => {
    if (task.id === Number(id)) {
      task.reminder = reminder
    }
    return task
  })
  res.status(200).json({ success: true, data: newTasks })
}
const getTask = (req, res) => {
  const { id } = req.params
  const task = tasks.find((task) => task.id === Number(id))

  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  
  
  res.status(200).json({ success: true, data: task })
}

const deleteTask = (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id))
  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `no task with id ${req.params.id}` })
  }
  const newTasks = tasks.filter(
    (task) => task.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newTasks })
}

module.exports = {
  getTasks,
  updateTask,
  deleteTask,
  createTask,
  getTask,
}
