const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        height: 500,
        width: 300,
        frame: false,
        resizable: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    mainWindow.once('ready-to-show', mainWindow.show);
});
