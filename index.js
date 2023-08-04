const express = require("express");
const db = require("./db/connections");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    ],
  },
];

inquirer.prompt(menu).then((answers) => {
  console.log("User selected:", answers.mainScreen);
  let response = answers.mainScreen;
  if (response == "View all Employees") {
    console.log("View all Employees");
  }
  else if (response == "View all Departments") {
    console.log("View all Departments");
  }
  else if (response == "View all Roles") {
    console.log("View all Roles");
  }
  else if (response == "View all Employees") {
    console.log("View all Employees");
  }
  else if (response == "Add a Department") {
    console.log("Add a Department");
  }
  else if (response == "Add a Role") {
    console.log("Add a Role");
  }
  else if (response == "Add an Employee") {
    console.log("Add an Employee");
  }
  else {
    console.log("Update an Employee Role");
  }
});
