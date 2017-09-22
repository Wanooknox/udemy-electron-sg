const { app, BrowserWindow, ipcMain } = require('electron');

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
    console.log(videos);
});
