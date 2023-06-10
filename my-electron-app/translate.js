
// Obtiene el botón y agrega un event listener
const translateButton = document.getElementById('translate-button');
translateButton.addEventListener('click', async () => {
  // Obtiene el texto a traducir de tu aplicación
  const appText = 'Texto a traducir';

  // Realiza la traducción utilizando DeepL
  const translatedText = await translateText(appText, 'ca', 'en');

  // Utiliza el texto traducido en tu aplicación
  var elem = document.getElementById("prueba");
  elem.innerHTML = 'fwegwe';
});
