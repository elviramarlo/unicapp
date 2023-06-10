const { ipcRenderer, shell } = require('electron');
const fs = require('fs');
/* const { fstat } = require('original-fs'); */
const { exec } = require('child_process');


function apagarPC()
{
	exec('shutdown /s');
}

/* BOTONES MINIMIZAR, CERRAR Y MENSAJE DE ALERTA */
function minimize() {
 	ipcRenderer.send("minimize", "cobrafuma");
}

function windowClose() {
	ipcRenderer.send("close", "cobrafuma");
}

function messageBox(message) {
	ipcRenderer.send("box", message);
}

/* BOTONES SWITCH */
function checkSwitch(string) /* checkea si está activado o no */
{
	const cb = document.querySelector(string);
	return (cb.checked);
}

function changeSwitchValue(string, string2)
{
	const elements = document.getElementsByClassName(string2);
	if (!checkSwitch(string))
	{
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].style.color="grey";
			elements[i].style.pointerEvents="none";
			elements[i].style.cursor="default";
		}
	}
	else
	{
		if (string == "#lanzapps-switch")
			messageBox("El departamento de informática recomienda no utilizar las aplicaciones de Lanzapps desde esta aplicación.\nSu uso y posibles problemas derivados son responsabilidad del usuario.");
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].style.color="white";
			elements[i].style.pointerEvents="auto";
			elements[i].style.cursor="pointer";
		}
	}
}

/* ABRIR DIRECTORIOS Y DOCUMENTOS */
function openFolder(string)
{
	if (fs.existsSync(string))
		shell.openPath(string);
	else
		messageBox("No se tiene acceso a " + string);
}
const path1 = 'D:\\AMES-CMA';
const path2 = 'C:\\Users\\Public\\AMES-CMA';
function openFolderAMESCMA(string, string2, path)
{
	if (fs.existsSync(string + path))
		shell.openPath(string + path);
	else if (fs.existsSync(string2 + path))
		shell.openPath(string2 + path)
	else
		messageBox("No se tiene acceso");
}

function openFolderPDM(enabled, disabled) /* abre directorios diferentes según esté activado o no */
{
	if (checkSwitch('#PDM-switch'))
		openFolderAMESCMA(path1, path2, enabled);
	else
		openFolder(disabled);
}

/* ENVIAR EMAILS */
function sendEmailTicket()
{
	const subj = '[Ticket] Título de tu incidencia o solicitud';
	const saltoLinea = '%0D%0A';
	const body = 'URGENCIA (estándar o urgente -si no puedes trabajar-): ' + saltoLinea + 
				'DESCRIPCIÓN (cuanto más detallada mejor, puedes adjuntar imágenes o cualquier otro documento): '
				+ saltoLinea + saltoLinea;
	shell.openExternal('mailto:adrian.rodriguez@ames.group?subject='+subj+'&body='+body);
}

function sendEmailSala()
{
	const subj = 'Reserva sala de reunions';
	const saltoLinea = '%0D%0A';
	const body = 'TIPO DE SALA (grande o pequeña): ' + saltoLinea + 
	'RAZÓN (reunión de círculo, visita comercial...): ' + saltoLinea +
	'DÍA: ' + saltoLinea + 'HORA INICIO: ' + saltoLinea + 'HORA FINAL: ' + saltoLinea + saltoLinea ;
	shell.openExternal('mailto:adrian.rodriguez@ames.group?subject='+subj+'&body='+body);
}

/* CERRAR O ABRIR EL MENÚ AL PULSAR EN EL ICONO */
let menuOpen = 0;
function showMenu()
{
	const elem = document.getElementById("header");
	if (menuOpen == 0) {
		elem.style.display="inline";
		menuOpen = 1;
		const title = document.getElementById("principal");
		title.classList.add("no-drag");
	}
	else {
		elem.style.display="none";
		menuOpen = 0;
		const title = document.getElementById("principal");
		title.classList.remove("no-drag");
	}
}
const body = document.getElementById("principal");
body.addEventListener("click", () => {
	if (menuOpen == 1)
		showMenu();
});

/* RECOGER EL VALOR DEL INPUT PULSANDO EL BOTÓN O ENTER */
const boton = document.getElementById("botBusq");
boton.addEventListener("click", () => {

  const input = document.getElementById("myInput");
  const value = input.value;
  input.value='';
  findFolder(value);
  
});

/* funciona pulsando enter en general */
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        const input = document.getElementById("myInput");
		const value = input.value;
		input.value='';
        findFolder(value);
    }
});

 /* funciona solo pulsando enter en el input */
/* function onKeyUp(event) {
	var keycode = event.keyCode;
	if(keycode == '13'){
		var input = document.getElementById("myInput");
		var value = input.value;
        alert(value);
	}
} */

function findFolder(string)
{
	if (string == "Normes i seguretat")
		openFolder('J:\\documentacio\\comu\\seguretat i prevencio\\llista_normes_basiques');
	else if (string == "Index normes")
		openFolder('J:\\documentacio\\comu\\seguretat i prevencio\\llista_normes_basiques\\normes_fonamentals.pdf');
	else if (string == "Catàlegs")
		openFolder('J:\\documentacio\\comu\\catalegs pdf');
	else if (string == 'Index catàlegs')
		openFolder('J:\\documentacio\\comu\\catalegs pdf\\_index_catalegs.xlsm')
	else if (string == "Coneixements")
		openFolder('J:\\documentacio\\comu\\coneixements');
	else if (string == "Index coneixements")
		openFolder('J:\\documentacio\\comu\\coneixements\\_index_coneixements.xlsm');
	else if (string == "Documentació projectes")
		openFolderAMESCMA(path1, path2, '\\00_DocProj');
	else if (string == "Llistats projectes")
		openFolder('I:\\cma\\comun\\llistats projectes');
	else if (string == "Logos AMES")
		openFolder('I:\\cma\\comun\\logos');
	else if (string == "Plantilles")
		openFolder('I:\\cma\\comun\\plantilles');
	else if (string == "Convenis AMES-CMA")
		openFolder('I:\\cma\\comun\\convenis_ames-cma');
	else if (string == "LoginScript")
		openFolder('C:\\amesapps\\GENERAL\\LoginScript.lnk');
	else if (string == "Gediva Generator")
		openFolderAMESCMA(path1, path2, '\\00_DocProj\\02_Gediva\\gediva_generator_v2.xlsm');
	else if (string == "Imprimir PDFs")
		openFolder('J:\\altres\\utilitats\\imprimir_pdf.exe');
	else if (string == "DirAMES")
		openFolder('C:\\amesapps\\DIRAMES\\dirames.exe');
	else if (string == "Crear ticket d´informàtica")
		sendEmailTicket()
	else if (string == "Reservar sala reunions")
		sendEmailSala()
	else if (string == "Reiniciar Windows Explorer")
		openFolder('J:\\altres\\utilitats\\putu_windows.bat');
	else if (string == "Programar apagat PC")
		messageBox('Aplicació no disponible, encara en desenvolupament.')
	else if (string == "Disoldre carpetes")
		messageBox('Aplicació no disponible, encara en desenvolupament.')
	else if (string == "Endreçar arxius")
		messageBox('Aplicació no disponible, encara en desenvolupament.')
	else if (string == "Canviar noms arxius")
		messageBox('Aplicació no disponible, encara en desenvolupament.')
	else if (string == "Documentació general")
		openFolder('J:\\documentacio\\mecanics');
	else if (string == "Cercle OT-CMA")
		openFolder('J:\\documentacio\\mecanics\\cercle de qualitat ot-cma');
	else if (string == "Idees de millora")
		openFolder('J:\\documentacio\\mecanics\\idees de millora');
	else if (string == "Nova idea de millora")
		openFolder('J:\\documentacio\\mecanics\\idees de millora\\000_format_idees_multilingue_2018-07_macro.xlsm');
	else if (string == "Precodificats")
		openFolderAMESCMA(path1, path2, '\\Llibreries\\PreCodificats');
	else if (string == "Codificats")
		openFolderAMESCMA(path1, path2, '\\Elements Normalitzats\\Codificats');
	else if (string == "Normalitzats")
		openFolderAMESCMA(path1, path2, '\\Elements Normalitzats\\Norm');
	else if (string == "Palette parts")
		openFolder('J:\\llibreries\\mecanics\\palette parts');
	else if (string == "Peces AMES")
		openFolderAMESCMA(path1, path2, '\\Llibreries\\PecesSint');
	else if (string == "03 - Premses")
		openFolderPDM('\\03_Premses', 'J:\\projectes\\mecanics\\premses')
	else if (string == "04 - Forns")
		openFolderPDM('\\04_Forns', 'J:\\projectes\\mecanics\\forns')
	else if (string == "05 - Automatismes")
		openFolderPDM('\\05_Automat', 'J:\\projectes\\mecanics\\automat')
	else if (string == "24 - Elem. de manipulació")
		openFolderPDM('\\24_Elements Manutencio', 'J:\\projectes\\mecanics\\24')
	else if (string == "55 - Dissenys estàndard")
		openFolderPDM('\\55_Dissenys Estandard', 'J:\\projectes\\mecanics\\55')
	else if (string == "[SW] Restaurar configuració")
		openFolderAMESCMA(path1, path2, '\\SldWorks20\\Config\\restaurar_configuracion.bat');
	else if (string == "[SW] Reemplaça cargolam")
		openFolderAMESCMA(path1, path2, '\\Varis\\Soft\\ReemplaComponents.exe');
	else if (string == "[SW] Actualitzar Format")
		openFolderAMESCMA(path1, path2, '\\Varis\\Soft\\ActFormat.exe');
	else if (string == "[SW] Llista de materials")
		openFolderAMESCMA(path1, path2, '\\Varis\\Soft\\LDM.exe');
	else if (string == "[SW] Imprimir Conjunt")
		openFolderAMESCMA(path1, path2, '\\Varis\\Soft\\ImprimirConjunt.exe');
	else if (string == "[SW] Sld To Tot")
		openFolderAMESCMA(path1, path2, '\\Varis\\Soft\\SldToTot.exe');
	else if (string == "Estandarització detectors")
		openFolder('J:\\documentacio\\comu\\catalegs pdf\\detectors\\estandaritzacio_detectors.xlsx');
	else if (string == "Contactes AMES-CMA")
		shell.openExternal('https://contacts.google.com/');
	else if (string == "Esborrar temporals")
		openFolder('J:\\altres\\utilitats\\eliminarfitxersbigotis.xlsm');
	else if (string == "Elèctrics Documentació")
		openFolder('J:\\documentacio\\electrics');
	else if (string == "Visió i NDT Documentació")
		openFolder('J:\\documentacio\\visio i ndt');
	else if (string == "Llibreries")
		openFolder('J:\\llibreries\\electrics');
	else if (string == "Software")
		openFolder('J:\\altres\\software');
	else if (string == "Actualitzar CX-One Sysmac")
		openFolder('J:\\altres\\software\\omron\\act_cxone_sysmac');
	else if (string == "Elèctrics Projectes")
		openFolder('J:\\projectes\\electrics');
	else if (string == "Visió i NDT Projectes")
		openFolder('J:\\projectes\\visiondt\\projects');
	else if (string == "Referències material")
		openFolder('J:\\documentacio\\electrics\\refs_material.ods');
	else if (string == "Registres web")
		openFolder('J:\\documentacio\\electrics\\registros web.ods');
	else if (string == "Corrents màxims")
		openFolder('J:\\documentacio\\electrics\\tabla calculo intensidad admisible normas une.xls');
	else if (string == "Personal AMES-CMA")
		openFolder('I:\\cma\\comun\\personal');
	else if (string == "Calendaris AMES")
		openFolder('J:\\documentacio\\comu\\organigrames_plantes\\calendaris_plantes.pdf');
	else if (string == "Organigrames AMES")
		openFolder('J:\\documentacio\\comu\\organigrames_plantes');
	else if (string == "Enviaments a plantes")
		openFolder('I:\\cma\\enviaments a plantes');
	else if (string == "Magatzem")
		openFolder('I:\\cma\\comun\\magatzem');
	else if (string == "Logística")
		openFolderAMESCMA(path1, path2, '\\Logistica');
	else if (string == "Peticions per LDM")
		openFolderAMESCMA(path1, path2, '\\Varis\\Soft\\ldm_a_gestio\\data\\peticio_per_ldm.xlsm');
		else if (string == "Peticions LDM PDM")
		openFolderAMESCMA(path1, path2, '\\Varis\\Soft\\pdm_a_gestio\\data\\pdm_a_gestio.xlsm');
	else if (string == "Gestocs")
		messageBox('Aplicació no disponible, encara en desenvolupament.')
	else if (string == "Fotos")
		openFolder('J:\\projectes\\fotos');
	else if (string == "Publicacions")
		openFolder('J:\\projectes\\mecanics\\publicacions');
	else if (string == "Maquinaria")
		openFolder('J:\\documentacio\\comu\\maquinaria');
	else if (string == "Procediments")
		openFolderAMESCMA(path1, path2, '\\Procediments');
	else if (string == "Index procediments")
		openFolder('I:\\cma\\index_normes_cma.pdf');
	else if (string == "Verificacions")
		openFolder('J:\\projectes\\mecanics\\verificacions');
	else if (string == "Prevenció")
		openFolder('I:\\cmaprev');
	else if (string == "Lanzapps")
		openFolder('S:\\appshell\\lanzapps.lnk');
	else if (string == "Gestió")
		openFolder('C:\\amesapps\\produccio\\recanvis\\progs\\magatzem_recanvis.exe');
	else if (string == "Hores")
		openFolder('C:\\amesapps\\produccio\\recanvis\\progs\\horesinternes.exe');
	else if (string == "PDF Builder")
		openFolder('C:\\amesapps\\tifsandpdfs\\pdftkbuilder.exe');
	else if (string == "IsoCAT")
		openFolder('C:\\amesapps\\QUALITAT\\ISOCAT\\isocat.exe');
	else if (string == "DAP")
		openFolder('C:\\amesapps\\DAP\\dap.exe');
	else if (string == "Màquines")
		openFolder('C:\\amesapps\\MAQUINES\\mangmaquines.exe');
	else if (string == "Gestió IPs")
		openFolder('C:\\amesapps\\gestioips\\projectips.exe');
	else if (string == "Codificació articles")
		openFolder('C:\\amesapps\\produccio\\recanvis\\progs\\mangarticles.exe');
	else if (string == "Entrada albarans")
		openFolder('C:\\amesapps\\produccio\\recanvis\\progs\\entrades.exe');
}
