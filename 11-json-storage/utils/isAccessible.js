const fs = require('fs/promises')

const isAccessible = path => {
    return fs
      .access(path)
      .then(() => true)
      .catch(() => false);
  };

module.exports = isAccessible