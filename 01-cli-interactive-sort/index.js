const readline = require("readline");

const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

const exit = () => {
  console.log("Thank you for a game.");
  rl.close();
};

const play = () => {
  rl.question(
    "Hello.\nEnter 10 words or digits separated with spaces: ",
    (text) => {
      if (text === "exit") {
        exit();
        return;
      }
      sort(text.split(" "));
    }
  );
};

const sort = (items) => {
  console.log(
    "How would you like to sort them? \n1.Sort words alphabetically\n2.Show numbers from lesser to greater\n3.Show numbers from bigger to smaller\n4.Display words in ascending order by number of letters in the word\n5.Show only unique words\n6.Display only unique values from the set of words and numbers entered\n "
  );
  rl.question("Select (1 - 6) and press ENTER ", (text) => {
    switch (text) {
      case "1":
        sortedArray = items
          .filter((item) => isNaN(Number(item)))
          .sort((a, b) => a.localeCompare(b));
        console.log(sortedArray);
        break;
      case "2":
        sortedArray = items
          .filter((item) => !isNaN(Number(item)))
          .sort((a, b) => a - b);
        console.log(sortedArray);
        break;
      case "3":
        sortedArray = items
          .filter((item) => !isNaN(Number(item)))
          .sort((a, b) => b - a);
        console.log(sortedArray);
        break;
      case "4":
        sortedArray = items
          .filter((item) => isNaN(Number(item)))
          .sort((a, b) => a.length - b.length);
        console.log(sortedArray);
        break;
      case "5":
        sortedArray = items
          .filter((item) => isNaN(Number(item)))
          .filter((it, index, array) => array.indexOf(it) === index);
        console.log(sortedArray);
        break;
      case "6":
        sortedArray = items.filter(
          (item, index, array) => array.indexOf(item) === index
        );
        console.log(sortedArray);
        break;
      default:
        break;
    }
    if (text === "exit") {
      exit();
      return;
    } else {
      play();
    }
  });
};

play();
