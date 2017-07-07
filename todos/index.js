const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({show: false});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', app.quit);
    mainWindow.once('ready-to-show', mainWindow.show);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow () {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo',
        show: false
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.once('ready-to-show', addWindow.show);
    addWindow.on('closed', () => {
        addWindow = null;
    });
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

var menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                click: createAddWindow,
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: 'Clear All',
                accelerator: 'Ctrl+Shift+Delete',
                click: function () {
                    mainWindow.webContents.send('todo:clear');
                }
            },
            { label: 'Rage Quit', accelerator: 'CommandOrControl+Q', click () { app.quit(); } },
            {
                label: 'Exit',
                role: 'quit',
                accelerator: (() => {
                    return (process.platform === 'darwin') ? 'Command+Q' : 'Alt+F4';
                })()
            }
        ]
    }
];

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Dev Tools',
        role: 'toggledevtools',
        accelerator: 'F12'
    });
    menuTemplate.push({
        role: 'reload',
        accelerator: 'F5'
    });
}
