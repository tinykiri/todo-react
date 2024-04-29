import { useState } from 'react'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState('');

  function addTask() {
    const newTask = {
      id: tasks.length + 1 || 1,
      text: newTasks,
      completed: false,
    };

    const newTasksArray = [...tasks, newTask];

    setTasks(newTasksArray);
    setNewTasks('');
  }

  function handleCompleted(e, id) {
    const taskInQuestion = tasks.find(task => task.id === id);
    const taskInQuestionIndex = tasks.findIndex(task => task.id === id);

    taskInQuestion.completed = e.target.checked;

    const newTasksArray = [...tasks];

    newTasksArray.splice(taskInQuestionIndex, 1, taskInQuestion);
    setTasks(newTasksArray);
  }

  function deleteTask(id) {
    const taskToDelete = tasks.findIndex(task => task.id === id);

    const newTaskArray = [...tasks];
    newTaskArray.splice(taskToDelete, 1);
    setTasks(newTaskArray);
  }

  return (
    <div className='todoListArea'>
      <h2>TO-DO LIST ✅</h2>
      {!tasks.length && <p className='noTasks'>No tasks yet 🥲</p>}
      {tasks.map(task =>
        <div className='newTasksArea'
          key={task.id}
          >
          <input className='checkbox' type='checkbox' checked={task.completed} onChange={(e) => handleCompleted(e, task.id)} />
          <p className='newTaskText' 
          style={{
            textDecoration: task.completed && 'line-through'
          }}
          >{task.text}</p>
          <button className='btnDelete' onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      )}
      <div className='taskTextArea'>
        <input className='inputNewTask' type="text" placeholder='Add new task...' value={newTasks} onChange={(e) => setNewTasks(e.target.value)} />
        <button className='btnAdd' onClick={addTask}>Add</button>
      </div>
    </div>
  );
}

