function generateMarkdown(userResponses, userInfo) {

  // Plug userReponses into table of contents
  let draftTable = `## Table of Contents`;

  if (userResponses.installation !== '') { draftTable += `
  * [Installation](#installation)` };

  if (userResponses.contributing !== '') { draftTable += `
  * [Contributing](#contributing)` };

  
  // Create title and description
  // Generate badges
  let draftMarkdown = 
  `# ${userResponses.title}
  ![Badge for GitHub](https://img.shields.io/github/languages/top/${userResponses.username}/${userResponses.repository}?style=flat&logo=appveyor) 
  
  
  ## Description 
  
  
  ${userResponses.description}
  `
  // Add table of contents data to markdown
  draftMarkdown += draftTable;
  
  // Add license section to markdown
  draftMarkdown += `
  * [License](#license)`;

  // Create installation section
  if (userResponses.installation !== '') {
  
  draftMarkdown +=
  `
  
  ## Installation
  
  
  ${userResponses.installation}`
  };
  
  // Create contribution section
  if (userResponses.contributing !== '') {
  `
  
  ## Contributing
  
  
  ${userResponses.contributing}`
  };

  // Connect userResponses to license section
  draftMarkdown +=
  `
  
  ## License
  
  ${userResponses.license}
  `;

  // Questions section
  let draftDeveloper = 
  `
  ---
  
  ## Questions?
  
  ![Developer Profile Picture](${userInfo.avatar_url}) 
  
  For any questions, please contact me with the information below:
 
  GitHub: [@${userInfo.login}](${userInfo.url})
  `;

  // If GitHub email is not null, add to Developer section
  if (userInfo.email !== null) {
  
  draftDeveloper +=
  `
  Email: ${userInfo.email}
  `};

 // Add developer section to markdown
  draftMarkdown += draftDeveloper;

  // Return markdown
  return draftMarkdown;
};

// Export markdown module
module.exports = generateMarkdown;