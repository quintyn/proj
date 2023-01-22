import React, { useEffect, useState } from "react";
import { useAuth } from "./context/auth/useAuth";
import { useProjects } from "./context/projects/useProjects";
import { useTasks } from "./context/tasks/useTasks";
import { useTeamMembers } from "./context/team-members/useTeamMembers";
import { useFilter } from "./context/filter/useFilter";
import { useNotifications } from "./context/notifications/useNotifications";
import { useReports } from "./context/reports/useReports";
import { useSocket } from "./context/socket/useSocket";
import { useHistory } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectsList from "./components/ProjectsList";
import TasksList from "./components/TasksList";
import TaskDetails from "./components/TaskDetails";
import Comments from "./components/Comments";
import FileUpload from "./components/FileUpload";
import TeamMembersList from "./components/TeamMembersList";
import TeamMemberDetails from "./components/TeamMemberDetails";
import Reports from "./components/Reports";

function App() {
  const { isAuthenticated, user } = useAuth();
  const { projects, createProject, updateProject, deleteProject } =
    useProjects();
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
      // using the API endpoints
      // ...
    }
  }, [isAuthenticated]);

  useEffect(() => {
    socket.on("new-notification", (notification) => {
      // Add the new notification to the notifications array
      // ...
    });
  }, [socket, notifications]);

  return (
    <div>
      <Navbar />
      {isAuthenticated && (
        <>
          <ProjectsList
            projects={projects}
            setSelectedProject={setSelectedProject}
            createProject={createProject}
            updateProject={updateProject}
            deleteProject={deleteProject}
            search={search}
            filter={filter}
          />
          {selectedProject && (
            <>
              <TasksList
                tasks={tasks}
                setSelectedTask={setSelectedTask}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                search={search}
                filter={filter}
                selectedProject={selectedProject}
              />
              {selectedTask && (
                <>
                  <TaskDetails
                    task={selectedTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                  />
                  <Comments task={selectedTask} user={user} />
                  <FileUpload task={selectedTask} />
                </>
              )}
              <TeamMembersList
                teamMembers={teamMembers}
                setSelectedTeamMember={setSelectedTeamMember}
                addTeamMember={addTeamMember}
                removeTeamMember={removeTeamMember}
                search={search}
                filter={filter}
                selectedProject={selectedProject}
              />
              {selectedTeamMember && (
                <TeamMemberDetails
                  teamMember={selectedTeamMember}
                  removeTeamMember={removeTeamMember}
                />
              )}
            </>
          )}
          <Reports
            reports={reports}
            generateReport={generateReport}
            selectedProject={selectedProject}
          />
          <Notifications
            notifications={notifications}
            markNotificationAsRead={markNotificationAsRead}
          />
        </>
      )}
    </div>
  );
}

export default App;
