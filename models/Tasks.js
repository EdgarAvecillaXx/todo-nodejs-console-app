//* imports
const Task = require("./Task");
const colors = require("colors");

//* Declare Tasks list class
class Tasks {
  #list;

  constructor() {
    this.#list = {};
  }

  //* Show objList
  get ObjList() {
    return this.#list;
  }

  //* Show list
  get list() {
    const list = [];
    Object.keys(this.#list).forEach((key) => {
      list.push(this.#list[key]);
    });

    return list;
  }

  //* functions
  //? load the task obtained with the readdb function
  loadTasks(data) {
    data.map(({ id, desc, completedOn }) => {
      this.#list[id] = {
        id: id,
        desc: desc,
        completedOn: completedOn,
      };
    });
  }

  //? create a new task
  createTask(description) {
    const { id, desc, completedOn } = new Task(description);
    this.#list[id] = { id: id, desc: desc, completedOn: completedOn };
  }

  //? show all tasks
  showAllList() {
    this.list.map(({ desc, completedOn }, key) => {
      const numStr = key + 1 + ". ";
      const descStr = `${desc} :: `;
      const complete = completedOn ? "Completed".green : "Pending".red;
      console.log("  " + numStr.green + descStr + complete);
    });
  }

  //? show only completed or pending tasks depending on status param
  showPartialList(status) {
    let counter = 0;
    this.list.map(({ desc, completedOn }) => {
      if (status) {
        if (completedOn) {
          counter++;
          const numStr = counter + ".";
          console.log(
            `  ${numStr.green} ${desc} :: ${completedOn.toString().green}`
          );
        }
      } else {
        if (!completedOn) {
          counter++;
          const numStr = counter + ".";
          console.log(`  ${numStr.green} ${desc} :: ${"Pending".red}`);
        }
      }
    });
  }

  toogleStatus(ids) {
    ids.forEach((id) => {
      const tasks = this.#list[id];
      if (!tasks.completedOn) {
        tasks.completedOn = new Date().toLocaleDateString();
      }
    });

    this.list.forEach((task) => {
      if (!ids.includes(task.id)) {
        this.#list[task.id].completedOn = null;
      }
    });
  }

  //? Delete a task form the list
  deleteTask = (id) => {
    if (this.#list[id]) delete this.#list[id];
  };
}

module.exports = Tasks;
