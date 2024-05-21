import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import GoalList from './components/GoalList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi aplicación de tareas y metas</h1>
      </header>
      <main>
        <TaskList />
        <GoalList />
      </main>
    </div>
  );
}

export default App;
