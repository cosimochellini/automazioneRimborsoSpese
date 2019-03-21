// const pdf = require("../controller/pdf");
const excel = require("../controller/excel");
const pdf = require("../controller/pdf");
const timecard = require("../controller/timecard");

const rimborsoSpese = {};

rimborsoSpese.execute = async (settings, currentPath) => {
    const token = await timecard.getToken(settings);
    process.stdout.write("token acquired \n");

    const entries = await timecard.getTimecards(settings, token);
    process.stdout.write("timecard acquired \n");

    const worbook = await excel.importWorkbook(settings);
    process.stdout.write("workbook imported\n");

    let totalEntries = [];

    settings.clients.forEach(client => {

        process.stdout.write(`executing client ${client.name}\n`);

        let currentClient = settings.clients.find(c => c.name === client.name);

        let filterFunction = timecard.filterFunction[client.name] || timecard.filterFunction.default;

        entries.filter((item) => filterFunction(item, settings, currentClient)).forEach(item => {
            totalEntries.push({ client: client, entry: item });
        });

    });

    process.stdout.write("timecard filtered \n");

    const compiledWorkbook = await excel.compileWorkbook(settings, worbook, totalEntries);
    process.stdout.write("workbook compiled\n");

    const fileNamePath = await excel.exportWorkbook(settings, compiledWorkbook);
    process.stdout.write("workbook exported\n");

    //comandi opzionali
    if (settings.commands.exportToPdf) pdf.createPdf(settings, fileNamePath, currentPath);

    if (settings.commands.deleteExcel) excel.deleteExcel(`${currentPath}\\${fileNamePath}`);
    
    if (settings.commands.movePdf) pdf.movePdf(currentPath,fileNamePath, settings);

    return true;
};


module.exports = rimborsoSpese;