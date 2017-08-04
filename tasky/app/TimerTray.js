const { Tray } = require('electron');

class TimerTray extends Tray {
    constructor (iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.wireUp();
    }

    wireUp () {
        this.on('click', this.onClick.bind(this));
    };

    onClick (event, bounds) {
        var { x, y } = bounds;
        var {height, width} = this.mainWindow.getBounds();

        if (!this.mainWindow.isVisible()) {
            var yPosition = (process.platform === 'darwin') ? y : y - height;
            this.mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                height: height,
                width: width
            });
            this.mainWindow.show();
        }
    };
}

module.exports = TimerTray;
