const express = require("express");
const fs = require('fs/promises')
const cors = require("cors");
const path = require('path')
const multer = require('multer');
const uploadDir = path.join(process.cwd(), 'uploads');
const storeJson = path.join(process.cwd(), 'public', 'jsons');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
    limits: {
      fileSize: 1048576,
    },
  });

  const upload = multer({
    storage: storage,
  });

app.post("/", upload.single('json'), async (req, res, next) => {
    
    const { path: temporaryName, originalname } = req.file;
    const fileName = path.join(storeJson, originalname);
    try {
      await fs.rename(temporaryName, fileName);
    } catch (err) {
      await fs.unlink(temporaryName);
      return next(err);
    }
    res.json({ message: 'File is successfuly uploaded', status: 200 });
  });

  const isAccessible = path => {
    return fs
      .access(path)
      .then(() => true)
      .catch(() => false);
  };
  
  const createFolderIsNotExist = async folder => {
    if (!(await isAccessible(folder))) {
      await fs.mkdir(folder);
    }
  };

app.get("/:file", async (req, res) => {
    const {file} = req.params
    const pathToFile = path.resolve(__dirname, 'public', 'jsons', file)
    console.log(pathToFile)
    if (await isAccessible(pathToFile)) {
        return res.sendFile(pathToFile)
      } else {
        return res.status(200).send({
            message: `The file ${file} doesn't exist.`
        })
      }
    
})

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })
  
  app.use((err, req, res, next) => {
    const {status = 500, message = "Internal server error"} = err
    res.status(status).json({ message })
  })

  app.listen(3000, () => {
    createFolderIsNotExist(uploadDir);
    createFolderIsNotExist(storeJson);
    console.log("Server running")
  })
module.exports = app;