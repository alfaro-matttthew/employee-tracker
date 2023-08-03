INSERT INTO department (name)
VALUES ("Engineering"),
       ("Executive"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 45000, 101),
       ("Lead Engineer", 60000, 101),
       ("CEO", 450000, 102),
       ("Accountant", 125000, 103),
       ("Acount Manager", 160000, 103),
       ("Lawyer", 198000, 104),
       ("Legal Team Lead", 250000, 104),
       ("Salesperson", 80000, 105),
       ("Sales Lead", 100000, 105);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 218, NULL),
        ("Eric", "Graves", 217, 1001),
        ("Mike", "Chan", 217, 1001),
        ("Ashely", "Rodriguez", 211, NULL),
        ("Brittani", "Court", 210, 1004),
        ("Kevin", "Tupik", 210, 1004),
        ("Kunal", "Singh", 214, NULL),
        ("Barabara", "Spencer", 213, 1007),
        ("Malia", "Brown", 213, 1007),
        ("Sarah", "Lourd", 216, NULL),
        ("Tom", "Allen", 216, 1010),
        ("John", "Dinsmore", 212, NULL);