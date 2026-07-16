import React, { useState, useEffect } from 'react';
import API from '../../api'; // நீங்கள் உருவாக்கிய Axios Instance-ஐ இம்போர்ட் செய்கிறோம்
import './todo.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    
    // Edit மோடுக்கு தேவையான States
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    // ஸ்கிரீன் லோட் ஆகும்போது API மூலம் டேட்டாவை எடுக்கும்
    useEffect(() => {
        fetchTodos();
    }, []);

    // GET ALL TODOS
    const fetchTodos = async () => {
        try {
            const response = await API.get('/'); // Base URL-க்கு பின்னாடி எதுவும் தேவையில்லை என்பதால் '/'
            setTodos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // ADD NEW TODO
    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!taskInput.trim()) return;

        try {
            const response = await API.post('/', { task: taskInput });
            setTodos([...todos, response.data]); // புதிய todo-வை லிஸ்டில் சேர்க்கிறோம்
            setTaskInput(''); // Input field-ஐ கிளியர் செய்ய
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // DELETE TODO
    const handleDeleteTodo = async (id) => {
        try {
            await API.delete(`/${id}`); // எக்ஸாம்பிள்: http://localhost:5000/api/todo/1
            setTodos(todos.filter(todo => todo.id !== id)); // டெலிட் ஆனதை UI-ல் இருந்து நீக்குகிறோம்
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // EDIT பட்டன் கிளிக் செய்யும்போது
    const handleEditClick = (todo) => {
        setEditId(todo.id);       // எந்த Row எடிட் ஆகணும்னு ID செட் பண்றோம்
        setEditText(todo.task);   // பழைய டெக்ஸ்டை எடிட் இன் புட் பாக்ஸில் காட்டுகிறோம்
    };

    // CONDITIONAL SAVE BUTTON கிளிக் செய்யும்போது
    const handleSaveClick = async (id) => {
        if (!editText.trim()) return;

        try {
            const response = await API.put(`/${id}`, { task: editText });
            
            // UI-ல் இருக்கும் ஸ்டேட்டை அப்டேட் செய்கிறோம்
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
            
            // திரும்பவும் எடிட் மோடு ரிலீஸ் ஆகி சாதாரண மோடுக்கு மாறும்
            setEditId(null);
            setEditText('');
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div className="todo-container">
            <h2>MERN + Postgres Todo List</h2>
            
            {/* ADD TODO FORM */}
            <form onSubmit={handleAddTodo} className="todo-form">
                <input 
                    type="text" 
                    placeholder="உங்களுடைய வேலையை டைப் செய்யவும்..." 
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button type="submit" className="add-btn">Add Task</button>
            </form>

            {/* TODO LIST MAPPING */}
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        
                        {/* Conditional Rendering for Input vs Text */}
                        {editId === todo.id ? (
                            <input 
                                type="text" 
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)}
                                className="edit-input"
                            />
                        ) : (
                            <span className="todo-text">{todo.task}</span>
                        )}

                        <div className="todo-actions">
                            {/* CONDITIONAL BUTTON LOGIC (Edit <-> Save) */}
                            {editId === todo.id ? (
                                <button 
                                    className="save-btn" 
                                    onClick={() => handleSaveClick(todo.id)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button 
                                    className="edit-btn" 
                                    onClick={() => handleEditClick(todo)}
                                >
                                    Edit
                                </button>
                            )}

                            {/* DELETE BUTTON */}
                            <button 
                                className="delete-btn" 
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {todos.length === 0 && <p className="empty-msg">No tasks pending. Good job!</p>}
        </div>
    );
};

export default Todo;