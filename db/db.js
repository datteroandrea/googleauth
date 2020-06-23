const mysql = require('mysql2');
const config = require('../config.json');
const connection = mysql.createConnection({
    host: config.database.address,
    user: config.database.username,
    database: config.database.dbName,
    password: config.database.password
});

module.exports = connection;