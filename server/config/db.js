// const { Pool } = require('pg');
// require('dotenv').config(); // .env ஃபைலில் உள்ள வேரியபிள்களை ரீட் செய்ய

// // PostgreSQL டேட்டாபேஸ் விபரங்களை .env-ல் இருந்து எடுத்து பூல் (Pool) அமைக்கிறோம்
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// // டேட்டாபேஸ் கூட கனெக்ஷன் முதன்முதலில் உருவாகும்போது இந்த மெசேஜ் கன்சோலில் காட்டும்
// pool.on('connect', () => {
//     console.log('PostgreSQL Database உடன் கச்சிதமாக கனெக்ட் செய்யப்பட்டது! 🐘');
// });

// // கனெக்ஷனில் எதாவது எரர் வந்தால் கன்சோலில் காட்ட
// pool.on('error', (err) => {
//     console.error('டேட்டாபேஸ் கனெக்ஷனில் திடீர் பிழை:', err);
// });

// module.exports = pool;

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const { Pool } = require('pg');
require('dotenv').config(); // .env ஃபைலில் உள்ள வேரியபிள்களை ரீட் செய்ய

// PostgreSQL (Neon DB) டேட்டாபேஸ் விபரங்களை .env-ல் இருந்து எடுத்து பூல் (Pool) அமைக்கிறோம்
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // Neon கிளவுட் டேட்டாபேஸ் கனெக்ட் ஆக இது மிகவும் முக்கியம்!
    }
});

// டேட்டாபேஸ் கூட முதல் குயேரி (Query) நடக்கும்போதோ அல்லது கனெக்ஷன் உருவாகும்போதோ இந்த மெசேஜ் காட்டும்
pool.on('connect', () => {
    console.log('Neon DB கிளவுட் டேட்டாபேஸ் உடன் கச்சிதமாக கனெக்ட் செய்யப்பட்டது! ⚡🐘');
});

// கனெக்ஷனில் எதாவது எரர் வந்தால் கன்சோலில் காட்ட
pool.on('error', (err) => {
    console.error('Neon DB கனெக்ஷனில் திடீர் பிழை:', err);
});

module.exports = pool;