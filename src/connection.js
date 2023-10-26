const mysql = require("mysql2/promise");


const connection = mysql.createPool({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '123456',
    database: 'mydb',
});

module.exports = connection;