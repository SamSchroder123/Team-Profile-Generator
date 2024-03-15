const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Engineer.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const generateTeamPage = require("./src/page-template.js");

// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const employeeArr = [];

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

async function init() {
  try {
    const response = await inquirer.prompt(managerQuestions);
    const { name, employeeID, email, officeNumber } = response;
    // console.log(name, employeeID);
    const manager = new Manager(name, employeeID, email, officeNumber);
    console.log(manager);
    employeeArr.push(manager);
    menu();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function menu() {
  inquirer.prompt(menuQuestions).then((answers) => {
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
  engineer()
    .then((engObj) => {
      employeeArr.push(engObj);
      menu();
    })
    .catch((error) => {
      console.error("An error occurred while creating an Engineer:", error);
      menu(); // Continue to the menu even if an error occurs
    });
}

function createIntern() {
  intern()
    .then((intObj) => {
      employeeArr.push(intObj);
      menu();
    })
    .catch((error) => {
      console.error("An error occurred while creating an Intern:", error);
      menu(); // Continue to the menu even if an error occurs
    });
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
  const html = generateTeamPage(employeeArr);

  fs.writeFile(outputPath, html, (err) => {
    if (err) {
      console.error("An error occurred while writing the HTML file:", err);
    } else {
      console.log("Team page generated successfully!");
    }
  });
}

init();
