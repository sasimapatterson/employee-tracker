// const { ADDRGETNETWORKPARAMS } = require('dns');
// const { allowedNodeEnvironmentFlags } = require('process');

const inquirer = require('inquirer');
// Import and require mysql12 to connect to MySQL database.
const mysql = require('mysql2');
// Import and require console.table to print MySQL rows to the console.
const cTable = require('console.table');
// Connect to database.
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log('Glad you are here.');
    init();
});



// // Start the application using switch case.
function init() {
    inquirer.prompt([
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
                'Exit',
            ],
        }]).then(response => {
            // console.log(response);
            switch (response.option) {
                case 'View all departments':
                    viewAllDepts()
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

// init();
// View All Departments
function viewAllDepts() {
    connection.query(`SELECT department.id AS ID, name AS Department
    FROM department;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

// View All Roles
function viewAllRoles() {
    connection.query(`SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.name AS Department 
    FROM roles
    LEFT JOIN department 
    ON department.id = roles.department_id;`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        });
}

// View All Employees
function viewAllEmps() {
    connection.query(`SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, roles.title AS Title, 
    department.name AS Department, roles.salary AS Salary, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
    FROM employee
    LEFT JOIN roles ON employee.roles_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        });
}

// Add Department. Prompt for name of the department.
function addDept() {
    inquirer.prompt({
        type: 'input',
        message: 'Please enter the name of the new department',
        name: 'newDept'
    }).then(response => {
        // To capture the value of the department's name that will be added into the database.
        const newDepartment = response.newDept;

        connection.query(`INSERT INTO department (name) VALUES ("${newDepartment}")`,
            (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            });
    });
}

// Add Role. Prompt for employee's title, salary and department for the role.
function addRole() {
    inquirer.prompt([ 
        {
            type: 'input',
            message: "Please enter the employee's title",
            name: 'title'
        },
        {
            type: 'input',
            message: 'Please enter the salary amount',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Please enter the name of the department',
            name: 'department'
        },
    ]).then (response => {
        const empNewRole = response.title;
        const newRoleSalary = response.salary;
        const newRoleDept = response.department;

        connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${empNewRole}", "${newRoleSalary}", "${newRoleDept}")`,
            (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            });
    });
}

// Add an employee. Prompt for employee's first and lastname, role and manager.
function addEmp() {
    inquirer.prompt ([
        {
            type: 'input',
            message: "Please enter employee's first name",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "Please enter employee's last name",
            name: 'lastName'
        },
        {
            type: 'input',
            message: "Please enter employee's role",
            name: 'role'
        },
        {
            type: 'input',
            message: "Please enter manager's id",
            name: 'managerId'
        },
    ]).then(response => {
        const empFirstName = response.firstName;
        const empLastName = response.lastName;
        const empRole = response.role;
        const empManager = response.managerId;

        connection.query(`INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("${empFirstName}", "${empLastName}", "${empRole}", "${empManager}")`,
            (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            });
    })
}



