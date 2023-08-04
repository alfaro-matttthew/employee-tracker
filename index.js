const express = require("express");
const db = require("./db/connections");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
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
      "View all Employees",
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

function init() {
  inquirer.prompt(menu).then((answers) => {
    console.log("User selected:", answers.mainScreen);
    let response = answers.mainScreen;
    ///////////////////////////////////////////////////////////////////////
    if (response == "View all Departments") {
      console.log("View all Departments");

      database.query("SELECT * FROM department", function (err, results) {
        console.log("This Works");

        if (err) {
          console.error("error fetching data from database:", err.message);
          return;
        }
        console.table(results);
      });
      restart();
    }
    ///////////////////////////////////////////////////////////////////////
    else if (response == "View all Roles") {
      console.log("View all Roles");
      database.query("SELECT * FROM role", function (err, results) {
        console.log("This Works");
        if (err) {
          console.error("error fetching data from database:", err.message);
          return;
        }
        console.table(results); // Display the data as a table
      });
      restart();
    }
    ///////////////////////////////////////////////////////////////////////
    else if (response == "View all Employees") {
      console.log("View all Employees");
      database.query("SELECT * FROM employee", function (err, results) {
        console.log("This Works");
        if (err) {
          console.error("error fetching data from database:", err.message);
          return;
        }
        console.table(results); // Display the data as a table
      });
      restart();
    }
    ///////////////////////////////////////////////////////////////////////
    else if (response == "Add a Department") {
      console.log("Add a Department");
    }
    ///////////////////////////////////////////////////////////////////////
    else if (response == "Add a Role") {
      console.log("Add a Role");
    }
    ///// ADD AN EMPLOYEE ///////////////////////////////////////////////////
    else if (response == "Add an Employee") {
      console.log("Add an Employee");

      inquirer.prompt(addEmployeeQuestions).then((answers) => {
        console.log(answers);

        // Find the Manager
        let role = answers.role;

        if (
          role !== "Software Engineer" &&
          role !== "Accountant" &&
          role !== "Lawyer" &&
          role !== "Salesperson"
        ) {
          console.log("This person is a manager!");
        }
        
        else {
          let manager = null;
          console.log("This person is an employee!");

          if (role == "Software Engineer") {
            manager = 1004;
          } else if (role == "Accountant") {
            manager = 1007;
          } else if (role == "Lawyer") {
            manager = 1010;
          } else {
            manager = 1001;
          }
          console.log(`${manager} is the manager.`);
        };
      });
      // Insert into the Database
      database.query("SELECT * FROM employee", function (err, results) {
        console.log("This Works");
        if (err) {
          console.error("error fetching data from database:", err.message);
          return;
        }
        console.table(results); // Display the data as a table
      });
    }
    ///////////////////////////////////////////////////////////////////////
    else if (response == "Update an Employee Role") {
      console.log("Update an Employee Role");
    }
    ///////////////////////////////////////////////////////////////////////
    else {
      console.log("Exit");
    }
  });
}

function restart() {
  console.log("Left");
  init();
}

init();
