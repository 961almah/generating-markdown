const fs = require("fs");
const inquirer = require("inquirer");
const api = require("./utils/api.js")
const generateMarkdown = require ("./utils/generateMarkdown")
// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'username',
        message: 'Enter your GitHub username.',
        // We need to validate that user entered at least one word
        // https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter a GitHub username.");
            }
            return true;
        }
    },
    // GitHub Repository
    {
        type: 'input',
        name: 'repository',
        message: 'Enter the name of your repository on GitHub.',
        // We need to validate that user entered at least one word
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter the name of your GitHub repository.");
            }
            return true;
        } 
    },
    // Title of Project
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project.',
        // We need to validate that user entered at least one word
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter the title of your project.");
            }
            return true;
        }
    },
    {
        type: "checkbox",
        message: "What license are you using?",
        name: "license",
        choices: ["MIT", "GPLv3", "The Unlicense"],
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("You must enter the license of your project.");
          }
          return true;
        },
      },
];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
