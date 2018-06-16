const fs = require("fs");
const Excel = require('exceljs');
const api = require('./controller/api.js');
const settings = JSON.parse(fs.readFileSync('./settings/settings.json'));
//import component

const execute = async () => {
  const token = await api.getToken(settings);

  const entries = await api.getTimecards(settings, token);

  let workbook = new Excel.Workbook();
  let promiseWorkbook = workbook.xlsx.readFile("Rimborso.xlsx");

    let rimborso = promise[1].getWorksheet(1);

};


execute();