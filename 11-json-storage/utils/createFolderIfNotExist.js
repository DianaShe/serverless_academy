const fs = require('fs/promises')
const isAccessible = require("./isAccessible");

const createFolderIfNotExist = async folder => {
    if (!(await isAccessible(folder))) {
      await fs.mkdir(folder);
    }
  };

module.exports = createFolderIfNotExist