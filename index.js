const express = require("express");
const db = require("./db/connections");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// database.query()

db.connect((err) => {
  if (err) {
    console.error("error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the datebase!");

  //routes go here
});

menu = [
  {
    type: "list",
    name: "mainScreen",
    message: "What would you like to do?",
    choices: [
      "View all Data",
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Exit",
    ],
  },
];

addEmployeeQuestions = [
  {
    type: "input",
    name: "fname",
    message: "Enter their First Name:",
  },
  {
    type: "input",
    name: "lname",
    message: "Enter their Last Name:",
  },
  {
    type: "list",
    name: "role",
    message: "What is their job role?",
    choices: [
      "Software Engineer",
      "Lead Engineer",
      "CEO",
      "Accountant",
      "Account Manager",
      "Lawyer",
      "Legal Team Lead",
      "Salesperson",
      "Sales Lead",
    ],
  },
];

addRoleQuestions = [
  {
    type: "input",
    name: "rtitle",
    message: "Enter the New Role Title:",
  },
  {
    type: "input",
    name: "salary",
    message: "Enter the designated salary:",
  },
  {
    type: "list",
    name: "department",
    message: "Which department the new role belong to?",
    choices: ["Engineering", "Executive", "Finance", "Legal", "Sales"],
  },
];

addDepartmentQuestions = [
  {
    type: "input",
    name: "dname",
    message: "Enter the New Department Name:",
  },
];

function init() {
  inquirer.prompt(menu).then((answers) => {
    console.log("User selected:", answers.mainScreen);
    let response = answers.mainScreen;
    ///// View All Data ///////////////////////////////////////////////////
    if (response == "View all Data") {
      // console.log("View all Data");

      database.query(
        `
        SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee
        LEFT JOIN employee AS manager
        ON employee.manager_id = manager.id 

        JOIN role
        ON employee.role_id = role.id

        JOIN department
        ON role.department_id = department.id

        ORDER BY employee.id;
        `,
        function (err, results) {
          // console.log("This Works");

          if (err) {
            console.error("error fetching data from database:", err.message);
            return;
          }
          console.table(results);
          restart();
        }
      );
    }
    ///// View all Departments ///////////////////////////////////////////////////
    else if (response == "View all Departments") {
      // console.log("View all Departments");

      database.query("SELECT * FROM department", function (err, results) {
        // console.log("This Works");

        if (err) {
          console.error("error fetching data from database:", err.message);
          return;
        }
        console.table(results);
        restart();
      });
    }
    ///// View all Roles ///////////////////////////////////////////////////
    else if (response == "View all Roles") {
      // console.log("View all Roles");
      database.query("SELECT * FROM role", function (err, results) {
        // console.log("This Works");
        if (err) {
          console.error("error fetching data from database:", err.message);
          return;
        }
        console.table(results); // Display the data as a table
        restart();
      });
    }
    ///// View All EMPLOYEES ///////////////////////////////////////////////////
    else if (response == "View all Employees") {
      console.log("View all Employees");
      database.query("SELECT * FROM employee", function (err, results) {
        console.log("This Works");
        if (err) {
          console.error("error fetching data from database:", err.message);
          return;
        }
        console.table(results); // Display the data as a table
        restart();
      });
    }
    ///// ADD A Department ///////////////////////////////////////////////////
    else if (response == "Add a Department") {
      // console.log("Add a Department");

      inquirer.prompt(addDepartmentQuestions).then((answers) => {
        // console.log(answers);

        if (!answers.dname) {
          console.error("Department name is undefined.");
          return;
        }

        let department = answers.dname;

        //Insert into the Database
        database.query(
          `INSERT INTO department (name)
        VALUES ('${department}');`,
          function (err, results) {
            // console.log("This Works");
            if (err) {
              console.error("error fetching data from database:", err.message);
              return;
            }
            restart();
          }
        );
      });
    }
    ///// ADD A Role ///////////////////////////////////////////////////
    else if (response == "Add a Role") {
      // console.log("Add a Role");

      inquirer.prompt(addRoleQuestions).then((answers) => {
        // console.log(answers);

        let title = answers.rtitle;
        let salary = answers.salary;
        let departmentData = answers.department;
        let department = "";

        if (departmentData == "Engineering") {
          // console.log("Engineering");
          department = 101;
        } else if (departmentData == "Executive") {
          // console.log("Executive");
          department = 102;
        } else if (departmentData == "Finance") {
          // console.log("Finance");
          department = 103;
        } else if (departmentData == "Legal") {
          // console.log("Legal");
          department = 104;
        } else {
          console.log("Sales");
          department = 105;
        }

        // console.log(`INSERT INTO role (title, salary, department_id)
        // VALUES ('${title}', '${salary}', '${department}');`);

        //Insert into the Database
        database.query(
          `INSERT INTO role (title, salary, department_id)
          VALUES ('${title}', '${salary}', '${department}');`,
          function (err, results) {
            // console.log("This Works");
            if (err) {
              console.error("error fetching data from database:", err.message);
              return;
            }
            restart();
          }
        );
      });
    }
    ///// ADD AN EMPLOYEE ///////////////////////////////////////////////////
    else if (response == "Add an Employee") {
      // console.log("Add an Employee");

      inquirer.prompt(addEmployeeQuestions).then((answers) => {
        // console.log(answers);

        let fname = answers.fname;
        let lname = answers.lname;
        let roleData = answers.role;
        let role = "";
        let manager = "";

        // Find the Manager ID and the Role ID

        if (
          roleData !== "Software Engineer" &&
          roleData !== "Accountant" &&
          roleData !== "Lawyer" &&
          roleData !== "Salesperson"
        ) {
          // console.log("This person is a manager!");

          manager = "null";

          if (roleData == "Lead Engineer") {
            role = 211;
          } else if (roleData == "Account Manager") {
            role = 214;
          } else if (roleData == "Legal Team Lead") {
            role = 216;
          } else if (roleData == "Sales Lead") {
            role = 218;
          } else {
            role = 212;
          }
        } else {
          // console.log("This person is an employee!");

          if (roleData == "Software Engineer") {
            manager = 1004;
            role = 210;
          } else if (roleData == "Accountant") {
            manager = 1007;
            role = 213;
          } else if (roleData == "Lawyer") {
            manager = 1010;
            role = 215;
          } else {
            manager = 1001;
            role = 218;
          }
          // console.log(`${manager} is the manager.`);
        }

        // console.log(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        // VALUES ('${fname}', '${lname}', ${role}, ${manager});`);

        //Insert into the Database
        database.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('${fname}', '${lname}', ${role}, ${manager});`,
          function (err, results) {
            // console.log("This Works");
            if (err) {
              console.error("error fetching data from database:", err.message);
              return;
            }
            restart();
          }
        );
      });
    }
    ///// UPDATE AN EMPLOYEE ///////////////////////////////////////////////////
    else if (response == "Update an Employee Role") {
      console.log("This feature will be available in the next Update.");
      restart();

    }
    ///// EXIT ///////////////////////////////////////////////////
    else {
      // console.log("Exit");
      process.exit(1);
    }
  });
}

function restart() {
  init();
}

init();
