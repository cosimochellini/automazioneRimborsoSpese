const timecard = require("../controller/timecard");
const excel = require("../controller/excel");
const rimborsoSpese = {};

rimborsoSpese.execute = async (settings) => {
    const token = await timecard.getToken(settings);

    const entries = await timecard.getTimecards(settings, token);

    const filteredEntries = entries.filter((item) => timecard.filterFunction(item, settings));

    const worbook = await excel.importWorkbook(settings);

    const compiledWorkbook = await excel.compileWorkbook(settings, worbook, filteredEntries);
};


module.exports = rimborsoSpese;