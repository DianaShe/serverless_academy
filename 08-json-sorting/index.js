const findNested = (obj, key) => {
  let keyToFind;
  JSON.stringify(obj, (_, nestedValue) => {
    if (nestedValue && typeof nestedValue[key] === "boolean") {
      keyToFind = nestedValue[key];
    }
    return nestedValue;
  });

  return keyToFind;
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const res = await response.json();
    const resObject = JSON.parse(res);
    const value = findNested(resObject, "isDone");
    return `[Success] ${url}: isDone - ${value}`;
  } catch (error) {
    console.log(`[Fail] ${url}: ${error.message}`);
  }
};

const array = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];

const getData = async (urls) => {
  for (const url of urls) {
    const res = await fetchData(url);
    if (!res) {
      for (let index = 1; index < 3; index++) {
        await fetchData(url);
      }
    } else {
      console.log(res);
    }
  }
};

getData(array);

