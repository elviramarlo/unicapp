function removeAccents(text) {
	const sustitutions = {
	  àáâãäå: "a",
	  ÀÁÂÃÄÅ: "A",
	  èéêë: "e",
	  ÈÉÊË: "E",
	  ìíîï: "i",
	  ÌÍÎÏ: "I",
	  òóôõö: "o",
	  ÒÓÔÕÖ: "O",
	  ùúûü: "u",
	  ÙÚÛÜ: "U",  
	  '´': " "
	};
	// Devuelve un valor si 'letter' está incluído en la clave
	function getLetterReplacement(letter, replacements) {
		const findKey = Object.keys(replacements).reduce(
		  (origin, item, index) => (item.includes(letter) ? item : origin),
		  false
		);
		return findKey !== false ? replacements[findKey] : letter;
	}
	// Recorre letra por letra en busca de una sustitución
	return text.split("").map((letter) => getLetterReplacement(letter, sustitutions)).join("");
}

/*two arguments, the text field element and an array of possible autocompleted values:*/
function autocomplete(inp, arr) {
	var currentFocus;
	
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			let myArray = arr[i].split(" ");

			let whitoutAccent = [];
			for (let l = 0; l < myArray.length; l++) {
				whitoutAccent[l] = removeAccents(myArray[l]);
			}
			for (let j = 0; j < myArray.length; j++)
			{
			/*check if the item starts with the same letters as the text field value:*/
			if ((myArray[j].substr(0, val.length).toUpperCase() == val.toUpperCase() 
					&& (j == 0 || ((j > 0 && myArray[0][0] != myArray[1][0].toUpperCase())))
					&& ( j != 2|| ((j == 2 && myArray[0][0] != myArray[2][0].toUpperCase()))))
					|| (whitoutAccent[j].substr(0, val.length).toUpperCase() == val.toUpperCase() 
					&& (j == 0 || ((j > 0 && whitoutAccent[0][0] != whitoutAccent[1][0].toUpperCase())))
					&& ( j != 2|| ((j == 2 && whitoutAccent[0][0] != whitoutAccent[2][0].toUpperCase()))) )) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

				if (!checkSwitch('#PDM-switch') && (arr[i] == 'Documentació projectes' || arr[i] == 'Gediva Generator' || arr[i] == 'Procediments' || arr[i] == 'Peticions per LDM' || arr[i] == 'Precodificats' || arr[i] == 'Codificats' || arr[i] == 'Normalitzats' || arr[i] == 'Peces AMES' || arr[i] == 'Plantilla carpetes projecte' || arr[i] == '24 - Elem. de manipulació' || arr[i] == '[SW] Restaurar configuració' || arr[i] == '[SW] Reemplaça cargolam' || arr[i] == '[SW] Llista de materials'))
				{
					b.style.pointerEvents="none";
					b.style.color="grey";
				}
				if (!checkSwitch('#lanzapps-switch') && (arr[i] == 'Gestió' || arr[i] == 'Hores' || arr[i] == 'PDF Builder' || arr[i] == 'IsoCAT' || arr[i] == 'DAP' || arr[i] == 'Màquines' || arr[i] == 'Gestió IPs' || arr[i] == 'Codificació articles' || arr[i] == 'Entrada albarans'))
				{
					b.style.pointerEvents="none";
					b.style.color="grey";
				}
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values, (or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
			currentFocus++;
			/* and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 38) { //up
		  /*If the arrow UP key is pressed, decrease the currentFocus variable:*/
		  currentFocus--;
		  /*and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 13) {
		  /*If the ENTER key is pressed, prevent the form from being submitted,*/
		  e.preventDefault();
		  if (currentFocus > -1) {
			/*and simulate a click on the "active" item:*/
			if (x) x[currentFocus].click();
		  }
		}
	});

	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
	/*a function to remove the "active" class from all autocomplete items:*/
	for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
	  }
	}
	function closeAllLists(elmnt) {
	/*close all autocomplete lists in the document, except the one passed as an argument:*/
	var x = document.getElementsByClassName("autocomplete-items");
	for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
		x[i].parentNode.removeChild(x[i]);
		}
	  }
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
  }
  
/*An array containing all the elements:*/
var elements = ["Normes i seguretat",
"Catàlegs",
"Coneixements",
"Documentació projectes",
"Llistats projectes",
"Logos AMES",
"Plantilles",
"Convenis AMES-CMA",
"LoginScript",
"Gediva Generator",
"Imprimir PDFs",
"DirAMES",
"Crear ticket d´informàtica",
"Reservar sala reunions",
"Reiniciar Windows Explorer",
"Programar apagat PC",
"Disoldre carpetes",
"Endreçar arxius",
"Canviar noms arxius",
"Documentació general",
"Cercle OT-CMA",
"Idees de millora",
"Precodificats",
"Codificats",
"Normalitzats",
"Palette parts",
"Peces AMES",
"Plantilla carpetes projecte",
"03 - Premses",
"04 - Forns",
"05 - Automatismes",
"24 - Elem. de manipulació",
"55 - Dissenys estàndard",
"[SW] Restaurar configuració",
"[SW] Reemplaça cargolam",
"[SW] Actualitzar Format",
"[SW] Llista de materials",
"[SW] Imprimir Conjunt",
"[SW] Sld To Tot",
"Estandarització detectors",
"Contactes AMES-CMA",
"Esborrar temporals",
"Elèctrics Documentació",
"Visió i NDT Documentació",
"Llibreries",
"Software",
"Actualitzar CX-One Sysmac",
"Elèctrics Projectes",
"Visió i NDT Projectes",
"Referències material",
"Registres web",
"Corrents màxims",
"Personal AMES-CMA",
"Calendaris AMES",
"Organigrames AMES",
"Enviaments a plantes",
"Magatzem",
"Petitions per LDM",
"Gestocs",
"Fotos",
"Publicacions",
"Maquinaria",
"Procediments",
"Verificacions",
"Prevenció",
"Index normes",
"Index catàlegs",
"Index coneixements",
"Index procediments",
"Nova idea de millora",
"Lanzapps",
"Gestió",
"Hores",
"PDF Builder",
"IsoCAT",
"DAP",
"Màquines",
"Gestió IPs",
"Codificació articles",
"Entrada albarans"
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), elements);
