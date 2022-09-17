const inquirer = require('inquirer');
// Import and require mysql12.
const mysql = require('mysql2');

// Connect to database.
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function(err) {
    if(err) throw err;
});

