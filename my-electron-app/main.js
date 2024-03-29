const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let win = null;
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit()
}
else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
  app.whenReady().then(() => {
	createWindow()
  })
}
const createWindow = () => {
	win = new BrowserWindow({
		height: 460,
		width: 870,
		resizable: false,
		maximizable: false,
		fullscreen: false,
		fullscreenable: false,
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

	ipcMain.on("box", (event, data) => {
		dialog.showMessageBox({
			title: 'Mensaje importante',
			type: 'info',
			message: data,
		});
	});
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit()
})
