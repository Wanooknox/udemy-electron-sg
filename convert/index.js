const {app, BrowserWindow} = require('electron');

let mainWin;

app.on('ready', () => {
    mainWin = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: { backgroundThrottling: false }
    });
    mainWin.loadURL(`file://${__dirname}/src/index.html`);
});
