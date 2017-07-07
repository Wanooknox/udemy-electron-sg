const {app, BrowserWindow, Tray} = require('electron');
const path = require('path');

let mainWindow;
let tres;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        height: 500,
        width: 300,
        frame: false,
        resizable: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    // mainWindow.once('ready-to-show', mainWindow.show);
    mainWindow.on('blur', mainWindow.hide);

    var iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    var iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tres = new Tray(iconPath);
    tres.on('click', (event, bounds) => {
        console.log(`x: ${bounds.x} y: ${bounds.y}`);
        if (!mainWindow.isVisible()) {
            mainWindow.show();
        }
    });
});
