const express = require('express')
const app = express()
let { tasks } = require('./tasks')
const utils = require('./MongoUtils')
const router = require("./routes/router.tasks")
// parse json
app.use(express.json());
utils.connectToServer();
app.use("/api/tasks",router);



app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
