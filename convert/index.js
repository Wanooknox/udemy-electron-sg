const { app, BrowserWindow, ipcMain, shell } = require('electron');
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

ipcMain.on('convert:start', (event, videos) => {
    _.each(videos, vid => {
        const outputDir = vid.path.split(vid.name)[0];
        const outputName = vid.name.split('.')[0];
        const outputPath = `${outputDir}${outputName}.${vid.format}`;
        console.log(outputPath);
        ffmpeg(vid.path)
            .output(outputPath)
            .on('progress', function ({ timemark }) {
                mainWin.webContents.send('conversion:progress', { video: vid, timemark: timemark });
            })
            .on('end', () => mainWin.webContents.send('conversion:end', {video: vid, outputPath: outputPath}))
            .run();
    });
});

ipcMain.on('folder:open', function (event, outputPath) {
    shell.showItemInFolder(outputPath);
});
