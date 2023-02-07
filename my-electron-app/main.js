const { app, BrowserWindow, ipcMain, dialog } = require('electron')

const createWindow = () => {
	const win = new BrowserWindow({
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

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
