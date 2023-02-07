const { ipcRenderer, shell } = require('electron');
const { fstat } = require('original-fs');
const fs = require('fs');

/* BOTONES MINIMIZAR Y CERRAR */
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
	if (!checkSwitch(string))
	{
		const elements = document.getElementsByClassName(string2);
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].style.color="grey";
			elements[i].style.pointerEvents="none";
			elements[i].style.cursor="default";
		}
	}
	else
	{
		const elements = document.getElementsByClassName(string2);
		if (string == "#lanzapps-switch")
			messageBox("El departamento de informática recomienda no utilizar las aplicaciones de Lanzapps desde esta aplicación. Su uso y posibles problemas derivados son responsabilidad del usuario.");
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].style.color="white";
			elements[i].style.pointerEvents="auto";
			elements[i].style.cursor="pointer";
		}
	}
}

function openFolder(string)
{
	if (fs.existsSync(string))
		shell.openPath(string);
	else
		messageBox("No existe " + string);
}

function openFolderPDM(enabled, disabled) /* abre directorios diferentes según esté activado o no */
{
	if (checkSwitch('#PDM-switch'))
		openFolder(enabled);
	else
		openFolder(disabled);
}

function sendEmailTicket()
{
	let subj = '[Ticket] Título de tu incidencia o solicitud';
	let saltoLinea = '%0D%0A';
	let body = 'URGENCIA (estándar o urgente -si no puedes trabajar-): ' + saltoLinea + 
				'DESCRIPCIÓN (cuanto más detallada mejor, puedes adjuntar imágenes o cualquier otro documento): '
				+ saltoLinea + saltoLinea;
	window.open('mailto:adrian.rodriguez@ames.group?subject='+subj+'&body='+body);
}

function sendEmailSala()
{
	let subj = 'Reserva sala de reunions';
	let saltoLinea = '%0D%0A';
	let body = 'TIPO DE SALA (grande o pequeña): ' + saltoLinea + 
	'RAZÓN (reunión de círculo, visita comercial...): ' + saltoLinea +
	'DÍA: ' + saltoLinea + 'HORA INICIO: ' + saltoLinea + 'HORA FINAL: ' + saltoLinea + saltoLinea ;
	window.open('mailto:adrian.rodriguez@ames.group?subject='+subj+'&body='+body);
}

/* CERRAR O ABRIR EL MENÚ AL PULSAR EN EL ICONO */
var menuOpen = 0;
function showMenu()
{
	var elem = document.getElementById("header");
	if (menuOpen == 0)
	{
		elem.style.display="inline";
		menuOpen = 1;
	}
	else {
		elem.style.display="none";
		menuOpen = 0;
	}
}

function findFolder(string)
{
	if (string == "Normes i seguretat")
		openFolder('J:\\documentacio\\comu\\seguretat i prevencio\\llista_normes_basiques');
	if (string == "Index normes")
		openFolder('J:\\documentacio\\comu\\seguretat i prevencio\\llista_normes_basiques\\normes_fonamentals.pdf');
	if (string == "Catàlegs")
		openFolder('J:\\documentacio\\comu\\catalegs pdf');
	if (string == 'Index catàlegs')
		openFolder('J:\\documentacio\\comu\\catalegs pdf\\_index_catalegs.xlsm')
	if (string == "Coneixements")
		openFolder('J:\\documentacio\\comu\\coneixements');
	if (string == "Index coneixements")
		openFolder('J:\\documentacio\\comu\\coneixements\\_index_coneixements.xlsm');
	if (string == "Documentació projectes")
		openFolder('D:\\AMES-CMA\\00_DocProj');
	if (string == "Llistats projectes")
		openFolder('I:\\cma\\comun\\llistats projectes');
	if (string == "Logos AMES")
		openFolder('I:\\cma\\comun\\logos');
	if (string == "Plantilles")
		openFolder('I:\\cma\\comun\\plantilles');
	if (string == "Convenis AMES-CMA")
		openFolder('I:\\cma\\comun\\pacte_millores_ames-cma.pdf');
	if (string == "LoginScript")
		openFolder('C:\\amesapps\\GENERAL\\LoginScript');
	if (string == "Gediva Generator")
		openFolder('D:\\AMES-CMA\\00_DocProj\\02_Gediva\\gediva_generator_v2.xlsm');
	if (string == "Imprimir PDFs")
		openFolder('J:\\altres\\utilitats\\imprimir_pdf.exe');
	if (string == "DirAMES")
		openFolder('C:\\amesapps\\DIRAMES\\dirames.exe');
	if (string == "Crear ticket d´informàtica")
		sendEmailTicket()
	if (string == "Reservar sala reunions")
		sendEmailSala()
	if (string == "Reiniciar Windows Explorer")
		openFolder('J:\\altres\\utilitats\\putu_windows.bat');
	if (string == "Programar apagat PC")
		messageBox('Work in progress...')
	if (string == "Disoldre carpetes")
		messageBox('Work in progress...')
	if (string == "Endreçar arxius")
		messageBox('Work in progress...')
	if (string == "Canviar noms arxius")
		messageBox('Work in progress...')
	if (string == "Documentació general")
		openFolder('J:\\documentacio\\mecanics');
	if (string == "Cercle OT-CMA")
		openFolder('J:\\documentacio\\mecanics\\cercle de qualitat ot-cma');
	if (string == "Idees de millora")
		openFolder('J:\\documentacio\\mecanics\\idees de millora');
	if (string == "Nova idea de millora")
		openFolder('J:\\documentacio\\mecanics\\idees de millora\\000_format_idees_multilingue_2018-07_macro.xlsm');
	if (string == "Precodificats")
		openFolder('D:\\AMES-CMA\\Llibreries\\PreCodificats');
	if (string == "Codificats")
		openFolder('D:\\AMES-CMA\\Elements Normalitzats\\Codificats');
	if (string == "Normalitzats")
		openFolder('D:\\AMES-CMA\\Elements Normalitzats\\Norm');
	if (string == "Palette parts")
		openFolder('J:\\llibreries\\mecanics\\palette parts');
	if (string == "Peces AMES")
		openFolder('D:\\AMES-CMA\\Llibreries\\PecesSint');
	if (string == "Plantilla carpetes projecte")
		openFolder('D:\\AMES-CMA\\00_DocProj\\PlantillaEstructura');
	if (string == "03 - Premses")
		openFolderPDM('D:\\AMES-CMA\\03_Premses', 'J:\\projectes\\mecanics\\premses')
	if (string == "04 - Forns")
		openFolderPDM('D:\AMES-CMA\\04_Forns', 'J:\\projectes\\mecanics\\forns')
	if (string == "05 - Automatismes")
		openFolderPDM('D:\\AMES-CMA\\05_Automat', 'J:\\projectes\\mecanics\\automat')
	if (string == "24 - Elem. de manipulació")
		openFolderPDM('D:\\AMES-CM\A\24_Elements Manutencio', 'J:\\projectes\\mecanics\\24')
	if (string == "55 - Dissenys estàndard")
		openFolderPDM('D:\\AMES-CMA\\55_Dissenys Estandard', 'J:\\projectes\\mecanics\\55')
	if (string == "[SW] Restaurar configuració")
		openFolder('D:\\AMES-CMA\\SldWorks20\\Config\\restaurar_configuracion.bat');
	if (string == "[SW] Reemplaça cargolam")
		openFolder('D:\\AMES-CMA\Varis\\Soft\\ReemplaComponents.exe');
	if (string == "[SW] Actualitzar Format")
		openFolder('D:\\AMES-CMA\\Varis\\Soft\\ActFormat.exe');
	if (string == "[SW] Llista de materials")
		openFolder('D:\\AMES-CMA\\Varis\\Soft\\LDM.exe');
	if (string == "[SW] Imprimir Conjunt")
		openFolder('D:\\AMES-CMA\\Varis\\Soft\\ImprimirConjunt.exe');
	if (string == "[SW] Sld To Tot")
		openFolder('D:\\AMES-CMA\\Varis\\Soft\\SldToTot.exe');
	if (string == "Estandarització detectors")
		openFolder('J:\\documentacio\\comu\\catalegs pdf\\detectors\\estandaritzacio_detectors.xlsx');
	if (string == "Contactes AMES-CMA")
		openFolder('D:\\AMES-CMA\\Varis\\Soft\\ContactesAMES-CMA.exe');
	if (string == "Esborrar temporals")
		openFolder('J:\\altres\\utilitats\\eliminarfitxersbigotis.xlsm');
	if (string == "Elèctrics documentació")
		openFolder('J:\\documentacio\\electrics');
	if (string == "Visió i NDT Documentació")
		openFolder('J:\\documentacio\\visio i ndt');
	if (string == "Llibreries")
		openFolder('J:\\llibreries\\electrics');
	if (string == "Software")
		openFolder('J:\\altres\\software');
	if (string == "Actualitzar CX-One Sysmac")
		openFolder('J:\\altres\\software\\omron\\act_cxone_sysmac');
	if (string == "Elèctrics Projectes")
		openFolder('J:\\projectes\\electrics');
	if (string == "Visió i NDT Projectes")
		openFolder('J:\\projectes\\visiondt\\projects');
	if (string == "Referències material")
		openFolder('J:\\documentacio\\electrics\\refs_material.ods');
	if (string == "Registres web")
		openFolder('J:\\documentacio\\electrics\\registros web.ods');
	if (string == "Corrents màxims")
		openFolder('J:\\documentacio\\electrics\\tabla calculo intensidad admisible normas une.xls');
	if (string == "Personal AMES-CMA")
		openFolder('I:\\cma\\comun\\personal');
	if (string == "Calendaris AMES")
		openFolder('J:\\documentacio\\comu\\organigrames_plantes\\calendaris_plantes.pdf');
	if (string == "Organigrames AMES")
		openFolder('J:\\documentacio\\comu\\organigrames_plantes');
	if (string == "Enviaments a plantes")
		openFolder('I:\\cma\\enviaments a plantes');
	if (string == "Magatzem")
		openFolder('I:\\cma\\comun\\magatzem');
	if (string == "Petitions per LDM")
		openFolder('D:\\AMES-CMA\\Varis\\Soft\\ldm_a_gestio\\data\\peticio_per_ldm.xlsm');
	if (string == "Gestocs")
		messageBox('Work in progress...')
	if (string == "Fotos")
		openFolder('J:\\projectes\\fotos');
	if (string == "Publicacions")
		openFolder('J:\\projectes\\mecanics\\publicacions');
	if (string == "Maquinaria")
		openFolder('J:\\documentacio\\comu\\maquinaria');
	if (string == "Procediments")
		openFolder('D:\\AMES-CMA\\Procediments');
	if (string == "Index procediments")
		openFolder('I:\\cma\\index_normes_cma.pdf');
	if (string == "Verificacions")
		openFolder('J:\\projectes\\mecanics\\verificacions');
	if (string == "Prevenció")
		openFolder('I:\\cmaprev');
	if (string == "Lanzapps")
		openFolder('S:\\appshell\\lanzapps');
	if (string == "Gestió")
		openFolder('C:\\amesapps\\produccio\\recanvis\\progs\\magatzem_recanvis.exe');
	if (string == "Hores")
		openFolder('C:\\amesapps\\produccio\\recanvis\\progs\\horesinternes.exe');
	if (string == "PDF Builder")
		openFolder('C:\\amesapps\\tifsandpdfs\\pdftkbuilder.exe');
	if (string == "IsoCAT")
		openFolder('C:\\amesapps\\QUALITAT\\ISOCAT\\isocat.exe');
	if (string == "DAP")
		openFolder('C:\\amesapps\\DAP\\dap.exe');
	if (string == "Màquines")
		openFolder('C:\\amesapps\\MAQUINES\\mangmaquines.exe');
	if (string == "Gestió IPs")
		openFolder('C:\\amesapps\\gestioips\\projectips.exe');
	if (string == "Codificació articles")
		openFolder('C:\\amesapps\\produccio\\recanvis\\progs\\mangarticles.exe');
	if (string == "Entrada albarans")
		openFolder('C:\\amesapps\\produccio\\recanvis\\progs\\entrades.exe');
}

/* FUNCIONES PARA RECOGER EL VALOR DEL INPUT PULSANDO EL BOTÓN O ENTER */
var boton = document.getElementById("botBusq");
boton.addEventListener("click", () => {

  var input = document.getElementById("myInput");
  var value = input.value;
  findFolder(value);
  
});

/* funciona pulsando enter en general */
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        var input = document.getElementById("myInput");
		var value = input.value;
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