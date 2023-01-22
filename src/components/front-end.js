import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Project</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.project}</td>
              <td>{task.member}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
