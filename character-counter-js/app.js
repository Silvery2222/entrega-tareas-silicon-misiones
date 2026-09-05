// Defino el límite máximo de caracteres
const LIMITE = 210;

// Selecciono todos los elementos del DOM
const area = document.querySelector("#texto");
const caracteres = document.querySelector("#caracteres");
const palabras = document.querySelector("#palabras");
const sinEspacios = document.querySelector("#sinEspacios");
const restantes = document.querySelector("#restantes");
const botonLimpiar = document.querySelector("#btnLimpiar");

// Función principal que actualiza los contadores en tiempo real
function actualizar() {
    const textoActual = area.value;

    // Contador de caracteres totales
    caracteres.textContent = textoActual.length;

    // Contador de palabras
    const textoLimpio = textoActual.trim();
    if (textoLimpio === "") {
        palabras.textContent = 0;
    } else {
        // Separo por cualquier tipo y cantidad de espacios en blanco consecutivos
        palabras.textContent = textoLimpio.split(/\s+/).length;
    }

    // Contador de caracteres omitiendo todos los espacios
    sinEspacios.textContent = textoActual.replaceAll(" ", "").length;

    // Cálculo de caracteres restantes
    const caracteresRestantes = LIMITE - textoActual.length;
    restantes.textContent = caracteresRestantes;

    // Manejo del aviso visual en rojo mediante clases de CSS
    if (textoActual.length > LIMITE) {
        area.classList.add("excedido");
        restantes.parentElement.classList.add("excedido"); // Pone la tarjeta de restantes en rojo
    } else {
        area.classList.remove("excedido");
        restantes.parentElement.classList.remove("excedido");
    }
}

// Función para el botón Limpiar
function limpiarTexto() {
    area.value = ""; // vacio el cuadro de texto
    actualizar();    // Vuelvo a llamar a actualizar para resetear los spans a 0
}

// Registro los eventos correspondientes
area.addEventListener("input", actualizar);
botonLimpiar.addEventListener("click", limpiarTexto);
