import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProjectsContext } from "./ProjectsContext";
import { useProjects } from "./useProjects";

export const ProjectsState = ({ children }) => {
  const {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects();
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
