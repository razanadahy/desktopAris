(async () => {
    const { app, BrowserWindow, Menu ,ipcMain} = require('electron');
    const path = require('path');
    const isDev = (await import('electron-is-dev')).default;
    const fs = require('fs');

    const userDataPath = app.getPath('userData');
    const configFilePath = path.join(userDataPath, 'config.json');

    let mainWindow;
    let signupWindow;
    let signupWindowOpen = false;

    function createWindow(url) {
        mainWindow = new BrowserWindow({

            show: false,
            titleBarOverlay: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
            icon: path.join(__dirname, 'logo512.png'),
            autoHideMenuBar: true,
            minWidth: 800,
            minHeight: 600,
        });
        Menu.setApplicationMenu(null);
        mainWindow.once('ready-to-show', () => {
            mainWindow.maximize();
            mainWindow.show();
        });
        mainWindow.on('closed', () => {
            mainWindow = null;
        });

        mainWindow.loadURL(
            isDev
                ? `http://localhost:3000/${url}`
                : `file://${path.join(__dirname, '../build/index.html')}`
        );

        if (isDev) {
            mainWindow.webContents.openDevTools();
        }
    }
    function createSignupWindow() {
        signupWindow = new BrowserWindow({
            show: false,
            titleBarStyle: "hidden",
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
            icon: path.join(__dirname, 'logo512.png'),
            autoHideMenuBar: true,
            minWidth: 800,
            minHeight: 600,
            maxHeight: 600,
            maxWidth: 800
        });
        Menu.setApplicationMenu(null);
        signupWindow.loadURL(
            isDev
                ? 'http://localhost:3000/inscription'
                : `file://${path.join(__dirname, '../build/index.html/inscription')}`
        );

        signupWindow.once('ready-to-show', () => {
            signupWindow.show();
            signupWindowOpen = true;
        });
        signupWindow.on('close', (event) => {
            if (signupWindowOpen) {
                event.preventDefault();
            }
        });
        signupWindow.on('closed', () => {
            signupWindow = null;
            signupWindowOpen = false;
        });
    }
    app.whenReady( ).then(()=> {
        let config;
        try {
            config = JSON.parse(fs.readFileSync(configFilePath));
        } catch (e) {
            config = {};
        }
        if (!config.signedUp){
            return createSignupWindow()
        }
        return createWindow('')
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    ipcMain.on('signup-validated', () => {
        const config = { signedUp: true };
        fs.writeFileSync(configFilePath, JSON.stringify(config));
        if (signupWindow) {
            signupWindow.close();
            createWindow('main');
            signupWindow.destroy()
            signupWindow=null
        }
    });
    ipcMain.on('login',()=>{
        //const config = { signedUp: true };
        //fs.writeFileSync(configFilePath, JSON.stringify(config));
        if (signupWindow) {
            signupWindow.close()
            createWindow('');
            signupWindow.destroy()
            signupWindow=null
        }
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow('');
        }
    });
})();
