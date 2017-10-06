const { app, BrowserWindow, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');

let mainWin;

app.on('ready', () => {
    mainWin = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: { backgroundThrottling: false }
    });
    mainWin.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('videos:added', (event, videos) => {
    const promises = _.map(videos, vid => {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(vid.path, (e, meta) => {
                vid.duration = meta.format.duration;
                vid.format = 'avi';
                resolve(vid);
            });
        });
    });

    Promise.all(promises).then((results) => {
        mainWin.webContents.send('metadata:complete', results);
    });
});
