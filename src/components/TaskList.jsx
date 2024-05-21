import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/getTasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/tasks/addTask', { title, description, dueDate });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/removeTask/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <form onSubmit={addTask}>
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
        <input
          type="date"
          placeholder="Fecha de vencimiento"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Agregar Tarea</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Fecha de vencimiento: {task.due_date}</p>
            <button onClick={() => removeTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;