const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Please enter Manager's name",
  },
  {
    type: "input",
    name: "employeeID",
    message: "Please enter Manager's Employee ID",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter Manager's email address",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Please enter Manager's office number",
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Please enter Engineer's name",
  },
  {
    type: "input",
    name: "employeeID",
    message: "Please enter Engineer's Employee ID",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter Engineer's email address",
  },
  {
    type: "input",
    name: "github",
    message: "Please enter Engineer's GitHub username",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "Please enter Intern's name",
  },
  {
    type: "input",
    name: "employeeID",
    message: "Please enter Intern's Employee ID",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter Intern's email address",
  },
  {
    type: "input",
    name: "school",
    message: "Please enter Intern's school",
  },
];

const menuQuestions = [
  {
    type: "expand",
    name: "option",
    message: "Please choose an option",
    choices: [
      {
        key: "e",
        name: "Engineer",
        value: "engineer",
      },
      {
        key: "i",
        name: "Intern",
        value: "intern",
      },
      {
        key: "f",
        name: "Finished",
        value: "finished",
      },
    ],
  },
];

function init() {
  return inquirer.prompt(managerQuestions).then((answers) => {
    const name = answers.name;
    const ID = answers.employeeID;
    const email = answers.email;
    const officeNum = answers.officeNumber;
    const manObj = new Manager(name, ID, email, officeNum);
    console.log(manObj);
    employeeArr.push(manObj);
    menu();
  });
}

function menu() {
  inquirer.prompt(menuQuestions).then((answers) => {
    // console.log(answers);
    if (answers.option === "engineer") {
      createEngineer();
    } else if (answers.option === "intern") {
      createIntern();
    } else if (answers.option === "finished") {
      finish(employeeArr);
    }
  });
}

function createEngineer() {
  const engObj = engineer();
  employeeArr.push(engObj);
  menu();
}

function createIntern() {
  const intObj = intern();
  employeeArr.push(intObj);
  menu();
}

function engineer() {
  return inquirer.prompt(engineerQuestions).then((answers) => {
    const name = answers.name;
    const ID = answers.employeeID;
    const email = answers.email;
    const github = answers.github;
    return new Engineer(name, ID, email, github);
  });
}

function intern() {
  return inquirer.prompt(internQuestions).then((answers) => {
    const name = answers.name;
    const ID = answers.employeeID;
    const email = answers.email;
    const school = answers.school;
    return new Intern(name, ID, email, school);
  });
}

function finish(employeeArr) {
  const html = render(employeeArr);
  document.getElementById("root").appendChild(html);
}

const employeeArr = [];
init();
