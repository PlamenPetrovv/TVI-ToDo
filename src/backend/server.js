const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let tasks = []

app.get('/tasks', (req, res) => res.json(tasks))
app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body }
  tasks.push(task)
  res.json(task)
})
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter((task) => task.id !== parseInt(req.params.id))
  res.json({ success: true })
})

app.listen(4000, () => console.log('API running on http://localhost:4000'))
