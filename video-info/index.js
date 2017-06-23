const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const ffmpeg = require('fluent-ffmpeg');

let mainWindow;

app.on('ready', () => {
    wireUp();

    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

var wireUp = function () {
    // wire up event listeners
    ipcMain.on('video:submit', (event, path) => {
        console.log(path);
        ffmpeg.ffprobe(path, function (e, metadata) {
            console.log('Video length is: ', metadata.format.duration);
            mainWindow.webContents.send('video:metadata', metadata.format.duration);
        });
    });
};
