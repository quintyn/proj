import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                setProjects(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const createProject = async (projectData) => {
        try {
            const res = await axios.post('/api/projects', projectData);
            setProjects([...projects, res.data]);
        } catch (err) {
            setError(err);
        }
    };

    const updateProject = async (id, projectData) => {
        try {
            const res = await axios.patch(`/api/projects/${id}`, projectData);
            setProjects(projects.map((project) => project._id === id ? res.data : project));
        } catch (err) {
            setError(err);
        }
    };

    const deleteProject = async (id) => {
        try {
            await axios.delete(`/api/projects/${id}`);
            setProjects(projects.filter((project) => project._id !== id));
        } catch (err) {
            setError(err);
        }
    };

    return { projects, loading, error, createProject, updateProject, deleteProject };
};
