const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const upload = require("./storage");
const uploadFile = require("./controllers/uploadFile");
const getFile = require("./controllers/getFile");
const createFolderIfNotExist = require("./utils/createFolderIfNotExist");
const uploadDir = path.join(process.cwd(), 'uploads');
const storeJson = path.join(process.cwd(), 'public', 'jsons');


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/", upload.single('json'), uploadFile);

app.get("/:file", getFile)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })
  
  app.use((err, req, res, next) => {
    const {status = 500, message = "Internal server error"} = err
    res.status(status).json({ message })
  })

  app.listen(3000, () => {
    createFolderIfNotExist(uploadDir);
    createFolderIfNotExist(storeJson);
    console.log("Server running")
  })
module.exports = app;