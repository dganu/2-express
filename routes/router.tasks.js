const express = require('express')
const router = express.Router()

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require('../15-router-controller-db')

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)


module.exports = router
