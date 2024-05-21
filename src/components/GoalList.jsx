import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('/api/goals/getGoals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error al obtener las metas:', error);
    }
  };

  const addGoal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/goals/addGoal', { title, description });
      setGoals([...goals, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error al agregar la meta:', error);
    }
  };

  const removeGoal = async (goalId) => {
    try {
      await axios.delete(`/api/goals/removeGoal/${goalId}`);
      setGoals(goals.filter((goal) => goal.id !== goalId));
    } catch (error) {
      console.error('Error al eliminar la meta:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Metas</h2>
      <form onSubmit={addGoal}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Agregar Meta</button>
      </form>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <button onClick={() => removeGoal(goal.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;