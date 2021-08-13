const mysql = require('mysql2/promise');

module.exports.DATABASE = mysql.createPool({
    "host": "localhost",
    "user": "root",
    "password": "Thstreet94",
    "database": "Fastify-quasar",
    "port": "3306"
});