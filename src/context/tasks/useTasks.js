import { useState, useEffect } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const createTask = (newTask) => {
    // Make API call to create new task
    // Add new task to state
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    // Make API call to update task
    // Update task in state
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    // Make API call to delete task
    // Remove task from state
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    // Fetch tasks from the server
  }, []);

  return { tasks, createTask, updateTask, deleteTask };
};
