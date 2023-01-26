const { app, BrowserWindow, ipcMain } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
	resizable: false,
	frame: false,
	autoHideMenuBar: true,
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false
	}
  })

  win.loadFile('index.html')

  ipcMain.on("minimize", (event, data)=> {
	win.minimize();
  });

  ipcMain.on("close", (event, data)=> {
	win.close();
  });
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
