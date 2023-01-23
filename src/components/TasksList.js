import React, { useState } from "react";
import { useTasks } from "./context/tasks/useTasks";

export function TasksList({ selectedProject, setSelectedTask, search, filter }) {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();

  const filteredTasks = tasks.filter((task) => {
    if (!search && !filter) return true;
    if (search && !task.name.includes(search)) return false;
    if (filter && task.status !== filter) return false;
    return true;
  });

  const handleClick = (task) => {
    setSelectedTask(task);
  };

  const handleUpdate = (task) => {
    updateTask(task);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span onClick={() => handleClick(task)}>{task.name}</span>
            <button onClick={() => handleUpdate(task)}>Update</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
