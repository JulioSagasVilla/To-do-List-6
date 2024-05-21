const express = require('express');
const router = express.Router();
const connection = require('../db');

// Obtener todas las tareas
router.get('/getTasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las tareas:', err);
      res.status(500).json({ error: 'Error al obtener las tareas' });
      return;
    }
    res.json(results);
  });
});

// Agregar una nueva tarea
router.post('/addTask', (req, res) => {
  const { title, description, dueDate } = req.body;
  const query = 'INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)';
  connection.query(query, [title, description, dueDate], (err, result) => {
    if (err) {
      console.error('Error al agregar la tarea:', err);
      res.status(500).json({ error: 'Error al agregar la tarea' });
      return;
    }
    res.json({ message: 'Tarea agregada exitosamente', taskId: result.insertId });
  });
});

// Eliminar una tarea por su ID
router.delete('/removeTask/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const query = 'DELETE FROM tasks WHERE id = ?';
  connection.query(query, [taskId], (err, result) => {
    if (err) {
      console.error('Error al eliminar la tarea:', err);
      res.status(500).json({ error: 'Error al eliminar la tarea' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Tarea no encontrada' });
    } else {
      res.json({ message: 'Tarea eliminada exitosamente' });
    }
  });
});

module.exports = router;