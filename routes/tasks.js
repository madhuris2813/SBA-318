const express = require('express');
const router = express.Router();

let tasks = [];  // In-memory storage for tasks
let nextTaskId = 1;  // ID counter for tasks

// GET tasks and render view
router.get('/view', (req, res) => {
  res.render('index', { tasks });
});

// POST new task
router.post('/', (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTask = { id: nextTaskId++, title, description, dueDate };
  tasks.push(newTask);
  res.redirect('/api/tasks/view');
});

// PATCH to update task
router.patch('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { title, description, dueDate } = req.body;
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
  }
  res.redirect('/api/tasks/view');
});

// DELETE task
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  tasks = tasks.filter(t => t.id !== taskId);
  res.redirect('/api/tasks/view');
});

module.exports = router;
