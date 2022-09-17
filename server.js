// const { ADDRGETNETWORKPARAMS } = require('dns');
const inquirer = import('inquirer');

// Import and require mysql12.
const mysql = require('mysql2');
// const { allowedNodeEnvironmentFlags } = require('process');

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
    // init();
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
                'Exit'
            ],
        },
    ]).then(response => {
        console.log(response);
        // switch (response.option) {
        //     case 'View all departments':
        //         viewAllDepts()
        //         break;
        //     case 'View all roles':
        //         viewAllRoles()
        //         break;
        //     case 'View all employees':
        //         viewAllEmps()
        //         break;
        //     case 'Add a department':
        //         addDept()
        //         break;
        //     case 'Add a role':
        //         addRole()
        //         break;
        //     case 'Add an Employee':
        //         addEmp()
        //         break;
        //     case 'Update employee role':
        //         updateEmpRole()
        //         break;
        //     // case 'Exit':
        //     //     connection.end();
        // }
    });
};

init();
// // View All Departments
// function viewAllDepts() {
//     connection.query(`SELECT department.id AS ID, name AS Department
//     FROM department;`, (err, res) => {
//         if (err) throw err;
//         console.log(res);
//         init();
//     });
// }

// // View All Roles
// function viewAllRoles() {
//     connection.query(`SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.name AS Department 
//     FROM roles
//     LEFT JOIN department 
//     ON department.id = roles.department_id;`,
//         (err, res) => {
//             if (err) throw err;
//             console.log(res);
//             init();
//         });
// }

// init();