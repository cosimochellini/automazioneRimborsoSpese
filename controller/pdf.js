const cmd = require('node-cmd');

const pdf = {};

pdf.createPdf = (settings, path, currentPath) => {

    const psCommand = `${settings.libreoffice.path} ${settings.libreoffice.command} \"${currentPath}/${path}\"`;
    cmd.run(psCommand);

};

module.exports = pdf;
