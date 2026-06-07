const express = require('express');
const router = express.Router();

// கன்ட்ரோலரில் இருந்து பங்க்ஷன்களை Destructure செய்து இம்போர்ட் செய்கிறோம்
const {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');

// 🔹 API Endpoints Mapping
router.get('/', getAllTodos);       // GET: http://localhost:5000/api/todo
router.post('/', createTodo);     // POST: http://localhost:5000/api/todo
router.put('/:id', updateTodo);    // PUT: http://localhost:5000/api/todo/:id
router.delete('/:id', deleteTodo); // DELETE: http://localhost:5000/api/todo/:id

module.exports = router;