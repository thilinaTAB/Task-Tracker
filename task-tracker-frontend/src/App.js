import React, { useState, useEffect } from 'react';
import TaskService from './services/TaskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    TaskService.getAllTasks().then(res => setTasks(res.data));
  };

  const addTask = () => {
    TaskService.createTask({ title, description, priority, completed: false })
      .then(fetchTasks)
      .finally(() => {
        setTitle('');
        setDescription('');
        setPriority('LOW');
      });
  };

  const deleteTask = (id) => {
    TaskService.deleteTask(id).then(fetchTasks);
  };

  const toggleCompleted = (task) => {
    TaskService.updateTask(task.id, { ...task, completed: !task.completed })
      .then(fetchTasks);
  };

  const changePriority = (task, newPriority) => {
    TaskService.updateTask(task.id, { ...task, priority: newPriority })
      .then(fetchTasks);
  };

  const updateTaskDetails = (task) => {
    const newTitle = prompt("Enter new title", task.title);
    const newDesc = prompt("Enter new description", task.description);
    if (newTitle !== null && newDesc !== null) {
      TaskService.updateTask(task.id, { ...task, title: newTitle, description: newDesc })
        .then(fetchTasks);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Tracker</h1>

      <div style={{ marginBottom: '20px' }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleCompleted(task)} />
            <strong>{task.title}</strong> - {task.description} - 
            <span style={{ color: task.priority === 'HIGH' ? 'red' : task.priority === 'MEDIUM' ? 'orange' : 'green' }}>
              {task.priority}
            </span>
            <button onClick={() => changePriority(task, 'HIGH')}>High</button>
            <button onClick={() => changePriority(task, 'MEDIUM')}>Medium</button>
            <button onClick={() => changePriority(task, 'LOW')}>Low</button>
            <button onClick={() => updateTaskDetails(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
