const { app, ipcMain } = require('electron');
const path = require('path');
const TimerTray = require('./app/TimerTray');
const MainWindow = require('./app/MainWindow');

let mainWindow;
let tres;

app.on('ready', () => {
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    mainWindow.once('ready-to-show', () => {
        var iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
        var iconPath = path.join(__dirname, `./src/assets/${iconName}`);
        tres = new TimerTray(iconPath, mainWindow);
    });
});

ipcMain.on('update-timer', (event, timeLeft) => {
    tres.setTitle(timeLeft); // MacOS Only.
});
