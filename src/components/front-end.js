import React from 'react';
import { useAuth } from './context/auth';
import { useProjects } from './context/projects';
import { useTasks } from './context/tasks';
import { useTeamMembers } from './context/team-members';
import { useFilter } from './context/filter';
import { useNotifications } from './context/notifications';
import { useReports } from './context/reports';
import { useSocket } from './context/socket';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const { isAuthenticated, user } = useAuth();
  const { projects, createProject, updateProject, deleteProject } = useProjects();
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const { teamMembers, addTeamMember, removeTeamMember } = useTeamMembers();
  const { search, filter } = useFilter();
  const { notifications, markNotificationAsRead } = useNotifications();
  const { reports, generateReport } = useReports();
  const socket = useSocket();
  const history = useHistory();
  const [selectedProject, setSelectedProject] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [selectedTeamMember, setSelectedTeamMember] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch projects, tasks, and team members from the server
    }
  }, [isAuthenticated]);

  useEffect(() => {
    socket.on('new-notification', notification => {
      // Add the new notification to the notifications array
    });
  }, [socket, notifications]);

  return (
    <div>
      {/* Render the navigation bar */}
      {isAuthenticated && (
        <>
          {/* Render the projects list */}
          {selectedProject && (
            <>
              {/* Render the tasks list */}
              {selectedTask && (
                <>
                  {/* Render the task details */}
                  {/* Render the comments section */}
                  {/* Render the file upload/download section */}
                </>
              )}
              {/* Render the team members list */}
              {selectedTeamMember && (
                <>
                  {/* Render the team member details */}
                </>
              )}
            </>
          )}
          {/* Render the reports section */}
        </>
      )}
    </div>
  );
}

export default App;
