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
                'Delete a department',
                'Remove an employee',
                'Exit',
            ],
        }]).then((response) => {
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
                case 'Add an employee':
                    addEmp()
                    break;
                case 'Update employee role':
                    updateEmpRole()
                    break;
                case 'Delete a department':
                    deleteDept()
                    break;
                case 'Remove an employee':
                    deleteEmp()
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
    inquirer.prompt(

        {
            type: 'input',
            message: 'Please enter the name of the new department',
            name: 'newDept'
        }
    ).then((response) => {
        connection.query(`INSERT INTO department SET ?`,
            {
                name: response.newDept,
            },
            (err) => {
                if (err) throw err;
                console.log(`Added ${response.newDept} successfully.`);
                init();
            });
    });
}

// Add Role. Prompt for employee's title, salary and department for the role.
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the role of the employee.",
            name: 'title'
        },
        {
            type: 'input',
            message: 'Please enter the salary amount',
            name: 'salary'
        },
        {
            type: 'input',
            message: "Please enter the department ID for this role.",
            name: 'department',
          
        },
    ]).then((response) => {
        connection.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [response.title, response.salary, response.department],
            (err) => {
                if (err) throw err;
                console.log('The role is successfully added.');
                init();
            });
    });
}

// Add an employee. Prompt for employee's first and lastname, role and manager.
function addEmp() {
    inquirer.prompt([
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
            message: "Please enter the ID that associate with the role",
            name: 'role'
        },
        {
            type: 'input',
            message: "Please enter the manager's ID for the selected employee",
            name: 'managerId'
        },
    ]).then((response) => {
        connection.query(`INSERT INTO employee SET ?`, //(first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`, [response.firstName, response.lastName, response.role, response.managerId],
            {
                first_name: response.firstName,
                last_name: response.lastName,
                roles_id: response.role,
                manager_id: response.managerId,
            },
            (err) => {
                if (err) throw err;
                console.log('The employee has been successfully added.');
                init();
            });
    });
};

// Update Employee Role.
function updateEmpRole() {
    inquirer.prompt([
        {
            type: 'list',
            message: "Please select an employee you wish to update.",
            name: 'empName',
            choices: [
                'Mark',
                'Sally',
                'Tim',
                'Rachael',
                'Tara',
                'Keith',
                'Sasi',
                'Andrew',
                'Keith',
            ],
        },
        {
            type: 'input',
            message: "Please enter the ID associate with the role you wish to assign to the selected employee.",
            name: 'roleId'
        },
        

    ]).then((response) => {
        connection.query(`INSERT INTO employee (first_name, roles_id) VALUES (?, ?)`, [response.firstName, response.role],
            (err) => {
                if (err) throw err;
                console.log('The employee role is successfully added');
                init();
            });
    })
}

// Delete department.
function deleteDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the ID of the department you wish to be removed",
            name: 'remvDept'
        }
    ]).then((response) => {
        connection.query(`DELETE FROM department WHERE id = ?`, [response.remvDept], (err) => {
            if (err) throw err;
            console.log("Successfully deleted");

            connection.query(`SELECT * FROM department`, (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
    });
}

function deleteEmp() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the ID of the employee you wish to remove from the database",
            name: 'empId'
        }
    ]).then((response) => {
        connection.query(`DELETE FROM employee WHERE id = ?`, [response.empId], (err) => {
            if (err) throw err;
            console.log("Successfully deleted");

            connection.query(`SELECT * FROM department`, (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
    });
}

