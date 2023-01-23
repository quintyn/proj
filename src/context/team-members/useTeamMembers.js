import { useState, useEffect } from "react";

export const useTeamMembers = (projectId) => {
  const [teamMembers, setTeamMembers] = useState([]);

  const addTeamMember = async (teamMember) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/team-members`, {
        method: "POST",
        body: JSON.stringify(teamMember),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setTeamMembers([...teamMembers, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTeamMember = async (teamMemberId) => {
    try {
      await fetch(`/api/projects/${projectId}/team-members/${teamMemberId}`, {
        method: "DELETE",
      });
      setTeamMembers(teamMembers.filter((tm) => tm._id !== teamMemberId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/team-members`);
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [projectId]);

  return { teamMembers, addTeamMember, removeTeamMember };
};
