const { ipcRenderer, shell } = require('electron');

function minimize() {
 	ipcRenderer.send("minimize", "cobrafuma")
}

function windowClose() {
	ipcRenderer.send("close", "cobrafuma")
}

function checkSwitch(string)
{
	const cb = document.querySelector(string);
	return (cb.checked)
}

function changePDMSwitchValue(string)
{
	if (!checkSwitch(string))
	{
		const elements = document.getElementsByClassName("disabledPDM");
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].style.color="grey";
			elements[i].style.pointerEvents="none";
			elements[i].style.curson="default";
		}
	}
	else
	{
		const elements = document.getElementsByClassName("disabledPDM");
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].style.color="white";
			elements[i].style.pointerEvents="auto";
			elements[i].style.curson="pointer";
		}
	}
}

function openFolder(string)
{
	shell.openPath(string)
}
