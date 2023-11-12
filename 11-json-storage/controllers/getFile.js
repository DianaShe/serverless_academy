const path = require('path');
const isAccessible = require('../utils/isAccessible');

const getFile = async (req, res) => {
    const {file} = req.params
    const pathToFile = path.resolve(__dirname, '../', 'public', 'jsons', file)
    
    if (await isAccessible(pathToFile)) {
        return res.sendFile(pathToFile)
      } else {
        return res.status(200).send({
            message: `The file ${file} doesn't exist.`
        })
      }
    
}

module.exports = getFile