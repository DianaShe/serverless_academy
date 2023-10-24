const inquirer = require("inquirer");
const { getUserByName, getUsersList, addUserToDB } = require("./db/operations");

async function promptFindInDB() {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Would you like to see the users in database?",
    },
  ]);

  if (!confirm) {
    process.exit();
  } else {
    const users = await getUsersList();
    console.log(users);
    await promptGetUser();
  }
}

async function promptGetUser() {
  const { userName } = await inquirer.prompt([
    {
      name: "userName",
      message: "What user would you like to find the in database?",
    },
  ]);

  const user = await getUserByName(userName);
  console.log(user);
}

async function start() {
  const { name } = await inquirer.prompt([
    { name: "name", message: "Enter user's name. To cancel press ENTER" },
  ]);

  if (!name) {
    promptFindInDB();
  } else {
    promptUserInfo(name);
  }
}

async function promptUserInfo(name) {
  const { gender } = await inquirer.prompt([
    {
      name: "gender",
      type: "list",
      message: "Choose user's gender",
      choices: [
        { name: "female", value: "female" },
        { name: "male", value: "male" },
      ],
    },
  ]);
  const { age } = await inquirer.prompt([
    { name: "age", message: "Enter user's age" },
  ]);

  await addUserToDB(name, gender, age);
  start();
}

start();
