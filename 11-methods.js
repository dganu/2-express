const { response } = require('express')
const express = require('express')
const app = express()
let { tasks } = require('./tasks')

// static assets
//app.use(express.static('./methods-public'))
// express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json())
//get home page
app.get('/', (req, res) => {
  res.status(200)
  res.write("<h1>Get All Tasks</h1><a href='/api/tasks'>Click Here</a>")
  res.end()
})

//get all the tasks from server
app.get('/api/tasks', (req, res) => {
  res.status(200).json({ success: true, data: tasks })
})

//Post is used for creating 
app.post('/api/tasks', (req, res) => {
  console.log("hello")
  const { text,day,reminder,status } = req.body
  const task = {
    text:text,
    day:day,
    reminder:reminder,
    id:id,
    status:status
  }
  const newTask = [...tasks,task]
  res.json(newTask);
})


//update the tasks
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params
  const { reminder } = req.body
  console.log(req.body);

  const task = tasks.find((task) => task.id === Number(id))

  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `no task with id ${id}` })
  }
  const newTasks = tasks.map((task) => {
    if (task.id === Number(id)) {
      console.log(reminder)
      task.reminder = reminder
    }
    return task
  })
  res.status(200).json({ success: true, data: newTasks })
})

app.delete('/api/tasks/:id', (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id))
  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `no task with id ${req.params.id}` })
  }
  const newTasks= tasks.filter(
    (task) => task.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newTasks })
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
