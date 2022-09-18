-- View all department
SELECT department.id AS ID, name AS Department
FROM department;

-- View all roles
SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.name AS Department 
FROM roles
LEFT JOIN department ON department.id = roles.department_id;

-- View all employees
SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, roles.title AS Title, department.name AS Department,
roles.salary AS Salary, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
FROM employee
LEFT JOIN roles ON employee.roles_id = roles.id 
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

--

-- SELECT * FROM roles;