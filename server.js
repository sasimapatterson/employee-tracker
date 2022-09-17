const { ADDRGETNETWORKPARAMS } = require('dns');
const inquirer = require('inquirer');
// Import and require mysql12.
const mysql = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');

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

// Start the application using switch case.
const init = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role',
                'Exit'
            ]
        }
    ]).then(response => {
        switch(response.option) {
            case 'View all departments':
                viewAllDept()
                break;
            case 'View all roles':
                viewAllRoles()
                break;
            case 'View all employees':
                viewAllEmps()
                break;
            case 'Add a department':
                addDept()
                break;
            case 'Add a role':
                addRole()
                break;
            case 'Add an Employee':
                addEmp()
                break;
            case 'Update employee role':
                updateEmpRole()
                break;
            case 'Exit':
                connection.end();
        }
    })
}

// View All Departments
