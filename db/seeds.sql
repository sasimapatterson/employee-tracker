USE employees_db;

INSERT INTO department (dept_name)
VALUES 
    ("Sales"),
    ("Accounting"),
    ("Engineering"),
    ("Legal");

INSERT INTO roles (title, salary, dept_name)
VALUES
    ("Account Executive", 100000, "Sales"),
    ("Sale Representativ", 80000, "Sales"),
    ("Controller", 120000, "Accounting"),
    ("Accountant", 80000, "Accounting"),
    ("Software Engineer", 120000, "Engineering"),
    ("Software Architect", 200000, "Engineering"),
    ("Lawyer", 200000, "Legal"),
    ("Paralegal", 100000, "Legal");

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
    ("Mark", "Happy", 1, NULL),
    ("Sally", "Turner", 2, 1),
    ("Tim", "Hoffman", 3, NULL),
    ("Rachael", "Kindheart", 4, 3),
    ("Tara", "Patter", 5, NULL),
    ("Keith", "Patter", 6, 5),
    ("Sasi", "Hatter", 7, NULL),
    ("Andrew", "Mason", 8, 7);



