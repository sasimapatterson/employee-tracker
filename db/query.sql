SELECT department.id AS ID, name AS Department
FROM department;

SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.name AS Department 
FROM roles
LEFT JOIN department ON department.id = roles.department_id;



-- SELECT * FROM roles;