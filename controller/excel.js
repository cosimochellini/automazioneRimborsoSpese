const Excel = require("exceljs");

const xls = {};

xls.importWorkbook = async settings => {
    let workbook = new Excel.Workbook();
    let importedFile = await workbook.xlsx.readFile(settings.constant.workbookPath);
    return importedFile;
}

xls.compileWorkbook = async (settings, workbook, entries) => {
    const workSheet = workbook.getWorksheet(1);

    workSheet.getCell("C2").value = _getCurrentMonth();
    await workSheet.gerTow(2).commit().catch((error => {
        var x = error;
    }));
    workbook.xlsx.writeFile('new.xlsx');

}


const _getCurrentMonth = () => {
    const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

    const d = new Date();

    return monthNames[d.getMonth()];
}

module.exports = xls;