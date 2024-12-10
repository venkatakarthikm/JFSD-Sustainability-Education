import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';

const LessonManager = () => {
    const [lessons, setLessons] = useState([]);
    const [newLesson, setNewLesson] = useState({
        title: '',
        description: '',
        imageUrl: '',
        youtubeLink: '',
    });
    const [editingLesson, setEditingLesson] = useState(null);

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            const response = await axios.get(`${config.url}/admin/lessons`);
            setLessons(response.data);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
    };

    const handleSaveLesson = async (e) => {
        e.preventDefault();
        try {
            if (editingLesson) {
                await axios.put(`${config.url}/admin/lessons/${editingLesson.id}`, newLesson);
            } else {
                await axios.post(`${config.url}/admin/lessons`, newLesson);
            }
            resetForm();
            fetchLessons();
        } catch (error) {
            console.error("Error while saving lesson:", error);
        }
    };

    const resetForm = () => {
        setNewLesson({ title: '', description: '', imageUrl: '', youtubeLink: '' });
        setEditingLesson(null);
    };

    const handleEditLesson = (lesson) => {
        setNewLesson(lesson);
        setEditingLesson(lesson);
    };

    const handleDeleteLesson = async (id) => {
        try {
            await axios.delete(`${config.url}/admin/lessons/${id}`);
            fetchLessons();
        } catch (error) {
            console.error("Error while deleting lesson:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Lesson Management</h2>
            <form onSubmit={handleSaveLesson} style={styles.form}>
                <input
                    type="text"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    placeholder="Lesson Title"
                    required
                    style={styles.input}
                />
                <textarea
                    value={newLesson.description}
                    onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                    placeholder="Description"
                    required
                    style={styles.textarea}
                />
                <input
                    type="text"
                    value={newLesson.imageUrl}
                    onChange={(e) => setNewLesson({ ...newLesson, imageUrl: e.target.value })}
                    placeholder="Image URL"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={newLesson.youtubeLink}
                    onChange={(e) => setNewLesson({ ...newLesson, youtubeLink: e.target.value })}
                    placeholder="YouTube Link"
                    style={styles.input}
                />
                <div style={styles.buttonContainer}>
                    <button type="submit" style={styles.buttonPrimary}>
                        {editingLesson ? 'Update Lesson' : 'Add Lesson'}
                    </button>
                    <button type="button" onClick={resetForm} style={styles.buttonSecondary}>
                        Reset
                    </button>
                </div>
            </form>
            <h3 style={styles.subHeading}>Existing Lessons</h3>
            <ul style={styles.lessonList}>
                {lessons.map((lesson) => (
                    <li key={lesson.id} style={styles.lessonItem}>
                        <div>
                            <strong>{lesson.title}</strong>
                            <p>{lesson.description}</p>
                            <img src={lesson.imageUrl} alt="Lesson" style={styles.lessonImage} />
                            <p>
                                <a href={lesson.youtubeLink} target="_blank" rel="noopener noreferrer">Watch Video</a>
                            </p>
                        </div>
                        <div style={styles.buttonContainer}>
                            <button onClick={() => handleEditLesson(lesson)} style={styles.buttonEdit}>Edit</button>
                            <button onClick={() => handleDeleteLesson(lesson.id)} style={styles.buttonDelete}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    textarea: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        resize: 'none',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    buttonPrimary: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonSecondary: {
        padding: '10px 20px',
        backgroundColor: '#ffc107',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    lessonList: {
        listStyleType: 'none',
        padding: 0,
    },
    lessonItem: {
        padding: '15px',
        margin: '10px 0',
        backgroundColor: 'white',
        borderRadius: '4px',
        border: '1px solid #ddd',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    lessonImage: {
        maxWidth: '100px',
        marginTop: '10px',
    },
    buttonEdit: {
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonDelete: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default LessonManager;
