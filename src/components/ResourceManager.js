import React, { useEffect, useState } from 'react';
import axios from 'axios';

import config from './config';

const ResourceManager = () => {
    const [resources, setResources] = useState([]);
    const [newResource, setNewResource] = useState({ title: '', url: '', type: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(`${config.url}/admin/resources`);
                setResources(response.data);
            } catch (err) {
                setError('Failed to fetch resources');
                console.error(err);
            }
        };
        fetchResources();
    }, []);

    const handleAddResource = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.url}/admin/resources`, newResource);
            setNewResource({ title: '', url: '', type: '' });
            // Refresh resources
            const response = await axios.get(`${config.url}/admin/resources`);
            setResources(response.data);
        } catch (err) {
            setError('Failed to add resource');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Manage Resources</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddResource}>
                <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    placeholder="Resource Title"
                    required
                />
                <input
                    type="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                    placeholder="Resource URL"
                    required
                />
                <select
                    value={newResource.type}
                    onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                >
                    <option value="">Select Type</option>
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                </select>
                <button type="submit">Add Resource</button>
            </form>
            <ul>
                {resources.map((resource) => (
                    <li key={resource.resource_id}>{resource.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ResourceManager;
