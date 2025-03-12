// filepath: /c:/Users/PC/Desktop/dev/servSTOCK/PayCheck!/PayCheck/src/config/db.js
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conectado ao banco de dados MySQL!");
        connection.release();
    }
});

module.exports = db;