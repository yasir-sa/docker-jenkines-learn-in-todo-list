const express = require('express');
const path = require('path'); // Node built-in module
const cors = require('cors'); // CORS தேவையென்றால் இருக்கட்டும்
const pool = require('./config/db'); // 🐘 டேட்டாபேஸ் கனெக்ஷன்
const todoRoutes = require('./routes/todoRoutes'); // 👈 இந்த வரியைத்தான் நீங்க மிஸ் பண்ணிட்டீங்க!
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// 1. React oda production build ('dist' folder)-a static-ah serve panrom
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. உங்களுடைய அசல் API Routes இங்கே இணைகிறது
app.use('/api/todo', todoRoutes);
const { v4: uuidv4 } = require('uuid');
console.log("Generated ID for Docker Test:", uuidv4());
// டெஸ்ட் ரூட் (டேட்டாபேஸ் டைம் செக் செய்ய)
app.get('/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: "Express சர்வர் சூப்பரா ஓடுது!", dbTime: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("டேட்டாபேஸ் பிழை!");
    }
});

// 3. React Router handle panna: Enna request vandhalum index.html-aye anupuvom
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));