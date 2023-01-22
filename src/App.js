import React from "react";
import { useAuth } from "./context/auth";
import { useProjects } from "./context/projects";
import { useTasks } from "./context/tasks";
import { useTeamMembers } from "./context/team-members";
import { useFilter } from "./context/filter";
import { useNotifications } from "./context/notifications";
import { useReports } from "./context/reports";
import { useSocket } from "./context/socket";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

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
    }
  }, [isAuthenticated]);

  useEffect(() => {
    socket.on("new-notification", (notification) => {
      // Add the new notification to the notifications array
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
                delete
                Task={deleteTask}
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
        </>
      )}
    </div>
  );
}

export default App;
