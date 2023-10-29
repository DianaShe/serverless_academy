const fs = require("fs/promises");
const path = require("path");
const fsSync = require("fs");

const pathToData = path.resolve(__dirname, "data");

const makeDataArray = async () => {
  try {
    const files = await fs.readdir(pathToData);

    const array = files.map((file) => {
      const pathToFile = path.join(__dirname, "data", file);
      const fileData = fsSync.readFileSync(pathToFile, "utf8");
      const dataArray = fileData.split("\n");

      return dataArray;
    });

    return array;
  } catch (err) {
    console.error(err.message);
  }
};

const uniqueValues = () => {
  makeDataArray().then((res) => findUnique(res));
};

const existInAllFiles = () => {
  makeDataArray().then((res) => isInEveryFile(res));
};

const existInAtleastTen = () => {
  makeDataArray().then((res) => foundInTen(res));
};

const findUnique = (array) => {
  const unique = array.reduce((acc, item) => {
    const unique = [...new Set(item)];
    acc += unique.length;
    return acc;
  }, 0);
  console.log(unique);
};

const isInEveryFile = (array) => {
  const data = array.reduce((prev, next) =>
    next.filter(Set.prototype.has, new Set(prev))
  );
  console.log(data.length);
};

const foundInTen = (array) => {
  const arrOfUnique = array.map((item) => [...new Set(item)]).flat(1);
  const res = arrOfUnique.reduce((acc, value) => {
    acc[value] ? (acc[value] += 1) : (acc[value] = 1);
    return acc;
  }, {});
  const result = Object.values(res).reduce((acc, value) => {
    return Number(value) > 10 ? (acc += 1) : acc;
  }, 0);
  console.log(result);
};

uniqueValues()
existInAllFiles()
existInAtleastTen();
