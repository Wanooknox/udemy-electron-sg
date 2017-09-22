const { BrowserWindow } = require('electron');

class MainWindow extends BrowserWindow {
    constructor (url) {
        super({
            show: false,
            height: 500,
            width: 300,
            frame: false,
            resizable: false,
            skipTaskbar: true,
            webPrefrences: { backgroundThrottling: false }
        });
        this.wireUp();
        this.loadURL(url);
    }

    wireUp () {
        this.on('blur', this.hide);
    }
}

module.exports = MainWindow;
