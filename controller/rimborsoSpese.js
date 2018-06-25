// const pdf = require("../controller/pdf");
const excel = require("../controller/excel");
const timecard = require("../controller/timecard");

const rimborsoSpese = {};

rimborsoSpese.execute = async (settings, currentPath) => {
    const token = await timecard.getToken(settings);
    process.stdout.write("token acquired \n");

    const entries = await timecard.getTimecards(settings, token);
    process.stdout.write("timecard acquired \n");

    const filteredEntries = entries.filter((item) => timecard.filterFunction(item, settings));
    process.stdout.write("timecard filtered \n");

    const worbook = await excel.importWorkbook(settings);
    process.stdout.write("workbook imported\n");

    const compiledWorkbook = await excel.compileWorkbook(settings, worbook, filteredEntries);
    process.stdout.write("workbook compiled\n");

    const fileNamePath = await excel.exportWorkbook(settings, compiledWorkbook);
    process.stdout.write("workbook exported\n");

    // const result = pdf.createPdf(settings, currentPath);
    return true;
};


module.exports = rimborsoSpese;