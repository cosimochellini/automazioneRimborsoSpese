const fs = require('fs');
const execSync = require('child_process').execSync;
const pdf = {
    createPdf: (settings, path, currentPath) => {

        const psCommand = `${settings.libreoffice.path} ${settings.libreoffice.command} \"${currentPath}/${path}\"`;
        code = execSync(psCommand);

    },

    movePdf: (currentPath, fileName, settings) => {
        const pdfName = fileName.replace("xlsx", "pdf");

        try {
            fs.renameSync(`${currentPath}\\${pdfName}`, `${settings.constant.pdfPath}\\${pdfName}`);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = pdf;
