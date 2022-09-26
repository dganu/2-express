const express = require('express')
const app = express()
const router = require('./routes/router.tasks')
// parse json
app.use(express.json())
app.use('/api/tasks', router)
app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
