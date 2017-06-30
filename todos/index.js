const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

var menuTemplate = [
    {
        label: 'File',
        submenu: [
            { label: 'New Todo' },
            { label: 'Rage Quit', accelerator: 'CommandOrControl+Q', click () { app.quit(); } },
            {
                label: 'Exit',
                role: 'quit',
                accelerator: (() => {
                    return (process.platform === 'darwin') ? 'Command+Q' : 'Alt+F4';
                })()
            }
        ]
    },
    {
        label: 'Dev Tools',
        role: 'toggledevtools'
    }
];

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}
