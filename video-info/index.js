const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

app.on('ready', () => {
    wireUp();

    var mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

var wireUp = function () {
    // wire up event listeners
    ipcMain.on('video:submit', (event, path) => {
        console.log(path);
    });
};
