const pool = require('../config/db');

// 🔹 GET ALL TODOS
const getAllTodos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error in getAllTodos:", error.message);
        res.status(500).json({ error: "Server error while fetching tasks" });
    }
};

// 🔹 CREATE NEW TODO
const createTodo = async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) {
            return res.status(400).json({ error: "Task content is required" });
        }

        const result = await pool.query(
            'INSERT INTO todos (task) VALUES ($1) RETURNING *',
            [task]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error in createTodo:", error.message);
        res.status(500).json({ error: "Server error while creating task" });
    }
};

// 🔹 UPDATE TODO (Conditional Edit/Save-க்கு இதுதான் பயன்படும்)
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({ error: "Updated task content is required" });
        }

        const result = await pool.query(
            'UPDATE todos SET task = $1 WHERE id = $2 RETURNING *',
            [task, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo item not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error in updateTodo:", error.message);
        res.status(500).json({ error: "Server error while updating task" });
    }
};

// 🔹 DELETE TODO
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo item not found" });
        }

        res.status(200).json({ message: "Todo task deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTodo:", error.message);
        res.status(500).json({ error: "Server error while deleting task" });
    }
};

// நீங்கள் கேட்ட அதே ஸ்டைலில் எக்ஸ்போர்ட் செய்கிறோம்
module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};