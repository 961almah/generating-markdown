const fs = require("fs");
const inquirer = require("inquirer");
const util = require('util');
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
        message: 'Enter the name of the repository you wish to use.',
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
        type: "input",
        name: "description",
        message: "Briefly describe your project.",
      },
    {
        type: 'input',
        name: 'installation',
        message: 'Walk through the steps the user should follow (if needed) to install your project',
        // Validation not required if question is optional
    },
    {
        type: "input",
        name: "contributing",
        message: "Mention people or sources that contributed to this project"
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project.',
        choices: ['afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear', 'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'agpl-3.0', 'gpl', 'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mit', 'mpl-2.0', 'osl-3.0', 'postgresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib']
        
    },
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('Your markdown file has been created.')
    });
}
// Reference: https://www.npmjs.com/package/util.promisify
const writeFileAsync = util.promisify(writeToFile);

// function to initialize program
async function init() {
    // https://www.w3schools.com/js/js_errors.asp
    try {
        // Reference inquirer array with prompts
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
        // https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Your responses have been logged. Calling to GitHub...");

        // Referencing API.js
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);

        // Pass inquirer data and api data to markdown
        console.log("Generating your markdown")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);

        // Write markdown
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

// function call to initialize program
init();
