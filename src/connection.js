const mysql = require("mysql2/promise");


const connection = mysql.createPool({
    host: 'localhost',
    post: 3308,
    user: 'root',
    password: 'root',
    database: 'futebol-amigo',
});

module.exports = connection;