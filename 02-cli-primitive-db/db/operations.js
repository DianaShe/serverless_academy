const fs = require("fs/promises");
const path = require("path");

const usersPath = path.join(__dirname, "data.txt");

async function getUserByName(userName) {
  try {
    const data = await getUsersList();
    const userToFind = data.find(
      (user) => user.name.toLowerCase() === userName.toLowerCase()
    );
    return userToFind;
  } catch (error) {
    console.log(error);
  }
}

async function getUsersList() {
  try {
    const data = await fs.readFile(usersPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function addUserToDB(name, gender, age) {
  const newUser = { name, gender, age };
  try {
    const data = await getUsersList();
    data.push(newUser);
    await fs.writeFile(usersPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUsersList, getUserByName, addUserToDB };
