USE employees;

INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Accounting"),
    ("Engineering"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Account Executive", 100000, 1),
    ("Sale Representativ", 80000, 1),
    ("Controller", 120000, 2),
    ("Accountant", 80000, 2),
    ("Software Engineer", 120000, 3),
    ("Software Architect", 200000, 3),
    ("Lawyer", 200000, 4),
    ("Paralegal", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Mark", "Happy", 1, NULL),
    ("Sally", "Turner", 2, 1),
    ("Tim", "Hoffman", 3, NULL),
    ("Rachael", "Kindheart", 4, 3)
    ("Keith", "Patter", 5, 6),
    ("Tara", "Patter", 6, NULL),
    ("Sasi", "Hatter", 7, NULL),
    ("Andrew", "Mason", 8, 7);

    

