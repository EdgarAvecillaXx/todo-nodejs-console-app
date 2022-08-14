//* npm imports
require("colors");

//* models
const Tasks = require("./models/Tasks");

//* helpers imports
const {
  inquirerMenu,
  inquirerPause,
  readInput,
  deleteList,
  confirm,
  completeTask,
} = require("./helpers/inquirerMenu");
const { saveDB, readDB } = require("./helpers/saveTasks");

//* here starts the main function of the app
const main = async () => {
  let opt = "";
  const tasks = new Tasks();
  const tasksDB = readDB();

  //* validate if the db has info
  if (tasksDB) {
    tasks.loadTasks(tasksDB);
  }

  do {
    //* print menu options
    opt = await inquirerMenu();

    //* validates selected option
    switch (opt) {
      case "1":
        const desc = await readInput("Enter a description: ");
        tasks.createTask(desc);
        console.log("\n  Task created!".green);
        break;
      case "2":
        tasks.showAllList();
        break;
      case "3":
        tasks.showPartialList(true);
        break;
      case "4":
        tasks.showPartialList(false);
        break;
      case "5":
        const ids = await completeTask(tasks.list);
        tasks.toogleStatus(ids);
        break;
      case "6":
        const del = await deleteList(tasks.list);
        let ok;
        if (del !== "0") {
          if (del) {
            ok = await confirm(
              `Are you sure you want to delete '${tasks.ObjList[del].desc.yellow} ?'`
            );
            if (ok) {
              tasks.deleteTask(del);
              console.log("\n  Task deleted succesfully...".green);
            }
          }
        } else {
          console.log(
            `  Delete has been cancelled, returning to menu...`.red.bold
          );
        }

        break;
      case "0":
        //* salir
        break;
    }

    //* every time we select an option the app saves our data into the db file
    saveDB(tasks.list);

    //* validates if the app keep running or we want to get out
    opt != "0" ? await inquirerPause() : console.clear();
  } while (opt != "0");
};

main();
