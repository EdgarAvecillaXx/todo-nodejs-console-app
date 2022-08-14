//* imports
const inquirer = require("inquirer");

//* custom imports
require("colors");

//* array needed for inquirer.prompt (menu options)
const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    suffix: "\n",
    pageSize: 10,
    choices: [
      {
        name: `${"1.".green} Create task`,
        value: "1",
        short: " ",
      },
      {
        name: `${"2.".green} Show tasks`,
        value: "2",
        short: " ",
      },
      {
        name: `${"3.".green} List tasks completed`,
        value: "3",
        short: " ",
      },
      {
        name: `${"4.".green} List pending tasks`,
        value: "4",
        short: " ",
      },
      {
        name: `${"5.".green} Complete task(s)`,
        value: "5",
        short: " ",
      },
      {
        name: `${"6.".green} Delete task`,
        value: "6",
        short: " ",
      },
      {
        name: `${"0.".green} Exit \n`,
        value: "0",
        short: " ",
      },
    ],
  },
];

//? async function for menu options (using inquirer prompt)
const inquirerMenu = async () => {
  console.clear();
  console.log("============================================".green);
  console.log("    Welcome to the ultra cool To-do App:".white);
  console.log("============================================\n".green);

  const { option } = await inquirer.prompt(menuOpts);
  return option;
};

//? async function for continue option (using inquirer prompt)
const inquirerPause = async () => {
  const pause = [
    {
      type: "input",
      name: "continue",
      prefix: "\n",
      message: `\nPress ${"ENTER".green} to continue\n`,
    },
  ];

  const enter = await inquirer.prompt(pause);
  return enter;
};

//? async function that reads an input
const readInput = async (message) => {
  const description = [
    {
      type: "input",
      name: "desc",
      prefix: " ",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please write a description";
        } else {
          return true;
        }
      },
    },
  ];

  const { desc } = await inquirer.prompt(description);
  return desc;
};

const deleteList = async (task) => {
  const choices = task.map(({ id, desc }, key) => {
    return {
      value: id,
      name: `${(key + 1 + ".").green} ${desc} `,
      short: " ",
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancel",
    short: " ",
  });

  const list = [
    {
      type: "list",
      name: "del",
      message: "Which task do you want to delete?",
      suffix: "\n",
      pageSize: 10,
      choices,
    },
  ];

  console.clear();
  console.log("============================================".green);
  console.log("    Welcome to the ultra cool To-do App:".white);
  console.log("============================================\n".green);

  if (task.length < 1) {
    console.log("There are no tasks to delete".red.bold);
  } else {
    const { del } = await inquirer.prompt(list);

    return del;
  }
};

const completeTask = async (tasks) => {
  const choices = tasks.map(({ id, desc, completedOn }, key) => {
    return {
      value: id,
      name: `${(key + 1 + ".").green} ${desc} `,
      short: desc,
      checked: completedOn ? true : false,
    };
  });

  const check = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      suffix: "\n",
      pageSize: 10,
      choices,
    },
  ];

  console.clear();
  console.log("============================================".green);
  console.log("    Welcome to the ultra cool To-do App:".white);
  console.log("============================================\n".green);

  if (tasks.length < 1) {
    console.log("There are no tasks to delete".red.bold);
  } else {
    const { ids } = await inquirer.prompt(check);
    return ids;
  }
};

const confirm = async (message) => {
  const question = {
    type: "confirm",
    name: "ok",
    prefix: " ",
    message,
  };

  const { ok } = await inquirer.prompt(question);

  return ok;
};

module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  deleteList,
  completeTask,
  confirm,
};
