const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let win = null;
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit()
} else {
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
		width: 870,
		height: 460,
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
