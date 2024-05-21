const express = require('express');
const router = express.Router();
const connection = require('../db');

// Obtener todas las metas
router.get('/getGoals', (req, res) => {
  const query = 'SELECT * FROM goals';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las metas:', err);
      res.status(500).json({ error: 'Error al obtener las metas' });
      return;
    }
    res.json(results);
  });
});

// Agregar una nueva meta
router.post('/addGoal', (req, res) => {
  const { title, description } = req.body;
  const query = 'INSERT INTO goals (title, description) VALUES (?, ?)';
  connection.query(query, [title, description], (err, result) => {
    if (err) {
      console.error('Error al agregar la meta:', err);
      res.status(500).json({ error: 'Error al agregar la meta' });
      return;
    }
    res.json({ message: 'Meta agregada exitosamente', goalId: result.insertId });
  });
});

// Eliminar una meta por su ID
router.delete('/removeGoal/:goalId', (req, res) => {
  const goalId = req.params.goalId;
  const query = 'DELETE FROM goals WHERE id = ?';
  connection.query(query, [goalId], (err, result) => {
    if (err) {
      console.error('Error al eliminar la meta:', err);
      res.status(500).json({ error: 'Error al eliminar la meta' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Meta no encontrada' });
    } else {
      res.json({ message: 'Meta eliminada exitosamente' });
    }
  });
});

module.exports = router;