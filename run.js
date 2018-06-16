const fs = require("fs");
const rimborsoSpese = require("./controller/rimborsoSpese");
//import component

const settings = JSON.parse(fs.readFileSync('./settings/settings.json'));

rimborsoSpese.execute(settings);