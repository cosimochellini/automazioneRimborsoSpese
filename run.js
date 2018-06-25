const fs = require("fs");
const rimborsoSpese = require("./controller/rimborsoSpese");
//import component

const settings = JSON.parse(fs.readFileSync('./settings/settings.json'));

rimborsoSpese.execute(settings, __dirname).then(result => {

    result ? process.stdout.write("script runned correctly\n") : process.stdout.write("script failed\n")

}).catch(error => process.stdout.write(error));