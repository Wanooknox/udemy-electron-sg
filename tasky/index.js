const {app, BrowserWindow} = require('electron');
const path = require('path');
const TimerTray = require('./app/TimerTray');

let mainWindow;
let tres;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        skipTaskbar: true
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    // mainWindow.once('ready-to-show', mainWindow.show);
    mainWindow.on('blur', mainWindow.hide);

    var iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    var iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tres = new TimerTray(iconPath, mainWindow);
});
