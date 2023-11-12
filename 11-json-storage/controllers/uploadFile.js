const path = require("path");
const fs = require('fs/promises');
const {nanoid} = require('nanoid');
const storeJson = path.join(process.cwd(), "public", "jsons");

const uploadFile = async (req, res, next) => {

  const { path: temporaryName, originalname } = req.file;
  const uniqueName = `${nanoid(5)}${originalname}`
  const fileName = path.join(storeJson, uniqueName);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({
    message: `File ${originalname} is renamed to ${uniqueName} and successfuly uploaded`,
    status: 200,
  });
};

module.exports = uploadFile;
