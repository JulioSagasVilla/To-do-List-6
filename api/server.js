const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const goalsRouter = require('./routes/goals');

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas base para las tareas y las metas
app.use('/api/tasks', tasksRouter);
app.use('/api/goals', goalsRouter);

// Puerto en el que el servidor escuchará
const port = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});