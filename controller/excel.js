const XlsxPopulate = require('xlsx-populate');
const dateFormat = require('dateformat');

const xls = {};

xls.importWorkbook = async settings => {
    return await XlsxPopulate.fromFileAsync(settings.constant.workbookPath);
};

xls.compileWorkbook = async (settings, workbook, entries) => {
    var sheet = workbook.sheet(settings.excel.worksheetName); //import the worksheet

    //setto il mese di riferimento a {mese} {Anno}
    sheet.cell(settings.excel.cells.meseRiferimento).value(`${_getCurrentMonth(settings)} ${new Date().getFullYear()}`);

    //setto la data del documento a oggi come {dd/mm/yyyy}
    sheet.cell(settings.excel.cells.dataDocumento).value(_format());

    //setto nome e cognome nel excel
    sheet.cell(settings.excel.cells.cognomeDocumento).value(settings.auth.surName);
    sheet.cell(settings.excel.cells.nomeDocumento).value(settings.auth.name);

    //setto la firma (nome e cognome con un font specifico)
    sheet.cell(settings.excel.cells.firmaDocumento).value(`${settings.auth.name} ${settings.auth.surName}`);

    let currentRow = settings.excel.row.initialRow;

    entries.forEach(timecard => {
        let date = timecard.Date;
        let currentDataCell = `${settings.excel.column.data}${currentRow}`;
        sheet.cell(currentDataCell).value(_format(date));

        let currentDestinazioneCell = `${settings.excel.column.destinazione}${currentRow}`;
        sheet.cell(currentDestinazioneCell).value(settings.constant.descrizioneDestinazione);

        let currentSpesaCell = `${settings.excel.column.spesa}${currentRow}`;
        sheet.cell(currentSpesaCell).value(settings.constant.spesa);
        currentRow++;
    });

    return workbook;
};

xls.exportWorkbook = async (settings, workbook) => {
    const fullName = `${settings.auth.name} ${settings.auth.surName}`;

    const path = `Rimborso ${fullName} ${new Date().getFullYear()}-${_getCurrentMonth(settings)}.xlsx`;

    await workbook.toFileAsync(path);

    return path;
};

const _getCurrentMonth = (settings) => {
    const monthNames = settings.constant.month;
    const d = new Date();
    return monthNames[d.getMonth()];
};

const _format = (date, format) => {
    date = date || new Date();
    format = format || "dd/mm/yyyy";
    return dateFormat(date, format)
}

module.exports = xls;