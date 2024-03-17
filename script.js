const formulario = document.getElementById("formulario");
const texto = document.getElementById("texto");
const tipo = document.getElementById("tipo");
const resultadoTexto = document.getElementById("resultado-texto");
const resultadoSonido = document.getElementById("resultado-sonido");
const listaHistorial = document.getElementById("lista-historial");

// Función para convertir a código Morse
function convertirMorse(texto) {
  // Tabla de conversiones
  const tablaMorse = {
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
  };

  let codigoMorse = "";
  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i].toLowerCase();
    if (tablaMorse[letra]) {
      codigoMorse += tablaMorse[letra] + " ";
    } else {
      codigoMorse += letra;
    }
  }
  return codigoMorse.trim();
}

// Función para convertir a binario
function convertirBinario(texto) {
  let codigoBinario = "";
  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i].charCodeAt(0).toString(2);
    codigoBinario += letra.padStart(8, "0") + " ";
  }
  return codigoBinario.trim();
}

// Función para convertir a Cifrado César
function convertirCesar(texto, desplazamiento) {
  let codigoCesar = "";
  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i].charCodeAt(0);
    let nuevoCodigo = letra;
    if (letra >= 65 && letra <= 90) { // Letras mayúsculas
      nuevoCodigo += desplazamiento;
      if (nuevoCodigo > 90) {
        nuevoCodigo -= 26;
      }
    } else if (letra >= 97 && letra <= 122) { // Letras minúsculas
      nuevoCodigo += desplazamiento;
      if (nuevoCodigo > 122) {
        nuevoCodigo -= 26;
      }
    }
    codigoCesar += String.fromCharCode(nuevoCodigo);
  }
  return codigoCesar;
}

// Función para reproducir sonido Morse
function reproducirSonidoMorse(codigoMorse) {
  const sonidos = {
    ".": "sonido_corto.mp3",
    "-": "sonido_largo.mp3",
  };

  let sonido = "";
  for (let i = 0; i < codigoMorse.length; i++) {
    if (sonidos[codigoMorse[i]]) {
      sonido += `<audio controls><source src="${sonidos[codigoMorse[i]]}" type="audio/mpeg"></audio>`;
    }
  }
  resultadoSonido.innerHTML = sonido;
}

// Función para agregar a historial
function agregarHistorial(texto, tipo, resultado) {
  const fecha = new Date();
  const itemHistorial = `<li>
    <p>Fecha: ${fecha.toLocaleDateString()}</p>
    <p>Texto original: ${texto}</p>
    <p>Tipo de conversión: ${tipo}</p>
    <p>Resultado: ${resultado}</p>
  </li>`;
  listaHistorial.insertAdjacentHTML("afterbegin", itemHistorial);
}

// Función para manejar el evento submit del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const textoOriginal = texto.value.trim();
  const tipoConversion = tipo.value;

  let resultado = "";
  switch (tipoConversion) {
    case "morse":
      resultado = convertirMorse(textoOriginal);
      reproducirSonidoMorse(resultado);
      break;
    case "binario":
      resultado = convertirBinario(textoOriginal);
      break;
    case "cesar":
      const desplazamiento = parseInt(prompt("Ingrese el desplazamiento para el Cifrado César:"));
if (!isNaN(desplazamiento)) {
  resultado = convertirCesar(textoOriginal, desplazamiento);
} else {
  alert("El desplazamiento debe ser un número entero.");
  return;
}
break;
  }

  resultadoTexto.innerHTML = resultado;
  agregarHistorial(textoOriginal, tipoConversion, resultado);
});


// Función para cargar el historial
(function cargarHistorial() {
  // Obtener datos del localStorage
  const historial = JSON.parse(localStorage.getItem("historial"));
  if (historial) {
    for (let i = 0; i < historial.length; i++) {
      const itemHistorial = `<li>
        <p>Fecha: ${historial[i].fecha}</p>
        <p>Texto original: ${historial[i].texto}</p>
        <p>Tipo de conversion: ${historial[i].tipo}</p>
        <p>Resultado: ${historial[i].resultado}</p>
      </li>`;
      listaHistorial.insertAdjacentHTML("afterbegin", itemHistorial);
    }
  }
})();

