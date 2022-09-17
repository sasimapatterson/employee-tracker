-- View all department
SELECT department.id AS ID, name AS Department
FROM department;

-- View all roles
SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.name AS Department 
FROM roles
LEFT JOIN department ON department.id = roles.department_id;

-- View all employees
SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS Department, 
roles.salary 
FROM employee 
LEFT JOIN roles ON employee.roles_id = roles.id 
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee ON employee.manager_id = employee.id;



-- SELECT * FROM roles;