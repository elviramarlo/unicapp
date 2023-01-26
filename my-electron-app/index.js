const { ipcRenderer } = require('electron');

function minimize() {
 	ipcRenderer.send("minimize", "cobrafuma")
}

function windowClose() {
	ipcRenderer.send("close", "cobrafuma")
}
