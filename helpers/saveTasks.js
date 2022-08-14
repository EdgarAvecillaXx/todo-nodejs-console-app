//* imports
const { writeFileSync, existsSync, readFileSync } = require("fs");

//* path 
const db = "./db/data.json";

//* this saves the info in our json doc
const saveDB = (data) => {
    writeFileSync(db, JSON.stringify(data));
};

//* this reads the info contained in the json doc
const readDB = () => {
    //* validates if the doc exists
    if (!existsSync(db)) return null;

    //* if exist it reads the info 
    const info = readFileSync(db, { encoding: "utf-8" });
    const data = JSON.parse(info);

    return data;
};

module.exports = { saveDB, readDB };
