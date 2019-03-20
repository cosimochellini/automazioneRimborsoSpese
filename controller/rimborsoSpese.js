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

        process.stdout.write(`executing client ${client}\n`);

        let filteredEntriesPerClient = entries.filter((item) => timecard.filterFunction[client](item, settings, client.name)).map(item => {
            return { client: client, entry: item }
        });

        totalEntries.push(filteredEntriesPerClient);

    });

    process.stdout.write("timecard filtered \n");

    const compiledWorkbook = await excel.compileWorkbook(settings, worbook, totalEntries);
    process.stdout.write("workbook compiled\n");

    const fileNamePath = await excel.exportWorkbook(settings, compiledWorkbook);
    process.stdout.write("workbook exported\n");

    const pdfResult = pdf.createPdf(settings, fileNamePath, currentPath);

    // const result = pdf.createPdf(settings, currentPath);
    return pdfResult;
};


module.exports = rimborsoSpese;