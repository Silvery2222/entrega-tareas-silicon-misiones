// ===== PARTE A: array de valores simples =====
console.log("--- PARTE A ---");

// 01. Declaración
let categorias = ["acción", "RPG", "deportes", "estrategia"];

// 02. Mostrar array completo y cantidad con .length
console.log(categorias);
console.log("Cantidad de categorías:", categorias.length);

// 03. Mostrar primer elemento y el último usando .length
console.log("Primera categoría:", categorias[0]);
console.log("Última categoría:", categorias[categorias.length - 1]);

// 04. Agregar elemento al final con .push()
categorias.push("aventura");
console.log("Cantidad tras push:", categorias.length);

// 05. Eliminar último elemento con .pop() e informar
let eliminada = categorias.pop();
console.log("Categoría eliminada:", eliminada);

// ===== PARTE B: objeto =====
console.log("--- PARTE B ---");

// 06. Declarar objeto usuario
let usuario = {
  nombre: "Ana",
  edad: 25,
  ciudad: "Posadas",
  temaFavorito: "videojuegos"
};

// 07. Mostrar frase con notación de punto
console.log(`Hola, me llamo ${usuario.nombre}, tengo ${usuario.edad} años, vivo en ${usuario.ciudad} y mi tema favorito son los ${usuario.temaFavorito}.`);

// 08. Modificar una propiedad y mostrar resultado
usuario.edad = 26;
console.log("Edad actualizada:", usuario.edad);

// 09. Agregar nueva propiedad y mostrar objeto completo
usuario.plataformaFavorita = "PC";
console.log(usuario);

// ===== PARTE C: array de objetos =====
console.log("--- PARTE C ---");

// 10. Declarar el array catalogo con al menos 4 objetos
let catalogo = [
  { titulo: "The Witcher 3", categoria: "RPG", puntaje: 10, visto: true },
  { titulo: "Elden Ring", categoria: "acción", puntaje: 9, visto: true },
  { titulo: "FIFA", categoria: "deportes", puntaje: 7, visto: false },
  { titulo: "Minecraft", categoria: "estrategia", puntaje: 8, visto: true }
];

// 11. Acceder por índice
console.log("Primer título:", catalogo[0].titulo);
console.log("Puntaje del tercer elemento:", catalogo[2].puntaje);

// 12. Línea descriptiva del segundo elemento (visto como texto)
let juego2 = catalogo[1];
let estadoTexto = juego2.visto ? "visto" : "pendiente";
console.log(`${juego2.titulo} ${juego2.categoria} ${juego2.puntaje}/10 ${estadoTexto}`);

// 13. Modificar el puntaje de un elemento
catalogo[2].puntaje = 8;
console.log("Puntaje actualizado:", catalogo[2].puntaje);

// 14. Agregar quinto elemento con .push() y mostrar cantidad
catalogo.push({ titulo: "Tetris", categoria: "estrategia", puntaje: 9, visto: false });
console.log("Cantidad total de elementos:", catalogo.length);

// ===== PARTE D: destructuring =====
console.log("--- PARTE D ---");

// 15. Destructuring de objeto sobre catalogo[0] y frase descriptiva
let { titulo, categoria, puntaje, visto } = catalogo[0];
let estado = visto ? "visto" : "pendiente";
console.log(`${titulo} ${categoria} ${puntaje}/10 ${estado}`);

// 16. Destructuring de objeto sobre usuario (extraer nombre y ciudad)
let { nombre, ciudad } = usuario;
console.log(`Nombre: ${nombre} | Ciudad: ${ciudad}`);

// 17. Destructuring de array sobre catalogo (extraer primero y segundo)
let [primero, segundo] = catalogo;
console.log("Primero:", primero.titulo);
console.log("Segundo:", segundo.titulo);

// ===== PARTE E: complementaria =====
console.log("--- PARTE E ---");

// 18. Renombrado en el destructuring
let { titulo: tituloDestacado } = catalogo[2];
console.log("Título destacado:", tituloDestacado);

// 19. Valor por defecto al extraer una propiedad inexistente
let { profesion = "sin datos" } = usuario;
console.log("Profesión:", profesion);

// 20. Intercambiar dos variables con destructuring de array
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log(`Valores intercambiados: a = ${a}, b = ${b}`);