const inquirer = require('inquirer');
const fs = require('fs');
const replace = require('replace-in-file');

const CURR_DIR = process.cwd();
const CHOICES = ['component', 'page'];
const QUESTIONS = [
  {
    name: 'item-type',
    type: 'list',
    message: 'Item type:',
    choices: CHOICES
  },
  {
    name: 'item-name',
    type: 'input',
    message: 'Item name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Item name may only include letters, numbers, underscores and hashes.';
    }
  }
];


inquirer.prompt(QUESTIONS)
  .then(answers => {
    const itemType = answers['item-type'];
    const itemName = answers['item-name'];
    const templatePath = `${__dirname}/templates/item`;
    const targetFolder = `${CURR_DIR}/src/${itemType}s/${itemName}`;

    fs.mkdirSync(targetFolder);
    createDirectoryContents(templatePath, itemName, targetFolder);
});


function createDirectoryContents (templatePath, itemName, targetFolder) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      const fileName = file === 'Page.vue' ? itemName + '.vue' : file;
      const writePath = `${targetFolder}/${fileName}`;
      fs.writeFileSync(writePath, contents, 'utf8');

      if(file === 'script.ts') {
        replace.sync({
          files: writePath,
          from: /ITEM/g,
          to: itemName,
        });
      }

      if(file === 'template.html') {
        replace.sync({
          files: writePath,
          from: /itemName/g,
          to: itemName.toLowerCase(),
        });
      }
    }
  });
}
