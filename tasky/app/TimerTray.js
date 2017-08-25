const { Tray, Menu } = require('electron');

class TimerTray extends Tray {
    constructor (iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.setToolTip('Timer App');
        this.wireUp();
    }

    wireUp () {
        this.on('click', this.onClick);
        this.on('right-click', this.onRightClick);
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

    onRightClick () {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                role: 'quit'
            }
        ]);
        this.popUpContextMenu(menuConfig);
    };

    callMeToMakeLintLessAnnoying () {

    }
}

module.exports = TimerTray;
