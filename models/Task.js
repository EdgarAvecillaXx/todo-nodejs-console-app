//* imports
const { v4: uuidv4 } = require("uuid");

//* model for task component
class Task {
    //* privates props
    #id;
    #desc;
    #completedOn = null;

    //* Constructor
    constructor(desc) {
        this.#id = uuidv4();
        this.#desc = desc;
    }

    //* Getters
    get id() {
        return this.#id;
    }
    get desc() {
        return this.#desc;
    }
    get date() {
        return this.#completedOn;
    }
}

module.exports = Task;
