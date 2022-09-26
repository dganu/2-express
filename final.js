const express = require('express')
const app = express()
let { tasks } = require('./data')
const utils = require('./MongoUtils')
const router = require("./router.tasks")
// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json());
utils.connectToServer();
app.use("/api/tasks",router);



app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
