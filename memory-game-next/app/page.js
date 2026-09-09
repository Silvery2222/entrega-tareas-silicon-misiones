"use client" 

import { useState, useEffect } from "react"
import "./app.css"

// Función para modelar y mezclar el tablero
const crearTablero = () => {
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8]
  // Duplicamos los números para tener los 8 pares (16 fichas en total)
  const fichasDuplicadas = [...numeros, ...numeros]
  
  // Mezclamos el array usando el algoritmo de ordenamiento al azar
  const fichasMezcladas = fichasDuplicadas.sort(() => Math.random() - 0.5)

  // Devolvemos el array estructurado en objetos como lo pide el PDF
  return fichasMezcladas.map((num, indice) => ({
    id: indice,
    valor: num,
    dadaVuelta: false,
    encontrada: false
  }))
}

export default function JuegoMemoria() {
  // --- ESTADOS DEL JUEGO ---
  const [tablero, setTablero] = useState(() => crearTablero())
  const [fichasSeleccionadas, setFichasSeleccionadas] = useState([])
  const [evaluando, setEvaluando] = useState(false) // Anti-trampa
  const [movimientos, setMovimientos] = useState(0) // Contador
  const [tiempo, setTiempo] = useState(0) // Cronómetro
  const [jugando, setJugando] = useState(false) // Activa el timer con el primer clic
  const [victoria, setVictoria] = useState(false) // Estado de ganar

  // --- EFECTO DEL TIMER (CRONÓMETRO) ---
  useEffect(() => {
    let intervalo = null
    if (jugando && !victoria) {
      intervalo = setInterval(() => {
        setTiempo((prevTiempo) => prevTiempo + 1)
      }, 1000)
    }
    return () => clearInterval(intervalo) // Limpieza del intervalo
  }, [jugando, victoria])

  // --- EFECTO PARA EVALUAR SI LOS PARES COINCIDEN ---
  useEffect(() => {
    if (fichasSeleccionadas.length === 2) {
      setEvaluando(true) // Bloqueamos clics extras (Anti-trampa)
      setMovimientos((prev) => prev + 1) // Suma un movimiento completo

      const [primera, segunda] = fichasSeleccionadas

      if (primera.valor === segunda.valor) {
        // Coinciden: las dejamos fijas como encontradas
        setTablero((prevTablero) =>
          prevTablero.map((ficha) =>
            ficha.valor === primera.valor ? { ...ficha, encontrada: true } : ficha
          )
        )
        resetearTurno()
      } else {
        // No coinciden: esperamos 1 segundo y las volvemos a ocultar
        setTimeout(() => {
          setTablero((prevTablero) =>
            prevTablero.map((ficha) =>
              ficha.id === primera.id || ficha.id === segunda.id
                ? { ...ficha, dadaVuelta: false }
                : ficha
            )
          )
          resetearTurno()
        }, 1000)
      }
    }
  }, [fichasSeleccionadas])

  // --- EFECTO PARA DETECTAR LA VICTORIA ---
  useEffect(() => {
    if (tablero.length > 0 && tablero.every((ficha) => ficha.encontrada)) {
      setVictoria(true)
    }
  }, [tablero])

  const resetearTurno = () => {
    setFichasSeleccionadas([])
    setEvaluando(false)
  }

  // --- MANEJAR EL CLIC EN UNA FICHA ---
  const manejarClicFicha = (fichaSeleccionada) => {
    // Validaciones anti-error y anti-trampa
    if (evaluando) return
    if (fichaSeleccionada.dadaVuelta || fichaSeleccionada.encontrada) return
    if (fichasSeleccionadas.length >= 2) return

    // Arranca el cronómetro en el primer clic de la partida
    if (!jugando) setJugando(true)

    // Damos vuelta la ficha visualmente
    setTablero((prevTablero) =>
      prevTablero.map((ficha) =>
        ficha.id === fichaSeleccionada.id ? { ...ficha, dadaVuelta: true } : ficha
      )
    )

    // La agregamos a la lista del turno actual
    setFichasSeleccionadas((prev) => [...prev, fichaSeleccionada])
  }

  // --- REINICIAR PARTIDA ---
  const reiniciarJuego = () => {
    setTablero(crearTablero())
    setFichasSeleccionadas([])
    setEvaluando(false)
    setMovimientos(0)
    setTiempo(0)
    setJugando(false)
    setVictoria(false)
  }

  // --- FORMATEAR TIEMPO A M:SS ---
  const formatearTiempo = () => {
    const minutos = Math.floor(tiempo / 60)
    const segundos = tiempo % 60
    return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`
  }

  return (
    <main className="contenedor-juego">
      {/* Encabezado del juego */}
      <header className="header-juego">
        <h1>Memory Game</h1>
        <button onClick={reiniciarJuego} className="btn-reiniciar">
          Nueva partida
        </button>
      </header>

      {/* Pantalla Condicional de Victoria o Grilla de Fichas */}
      {victoria ? (
        <section className="pantalla-victoria">
          <h2>¡Lo lograste! 🎉</h2>
          <p>Completaste el juego con éxito.</p>
          <div className="resumen">
            <p>⏱️ Tiempo final: {formatearTiempo()}</p>
            <p>🔢 Movimientos: {movimientos}</p>
          </div>
          <button onClick={reiniciarJuego} className="btn-jugar-nuevo">
            Jugar de nuevo
          </button>
        </section>
      ) : (
        /* Grilla del Tablero 4x4 */
        <section className="grilla-tablero">
          {tablero.map((ficha) => {
            const mostrarContenido = ficha.dadaVuelta || ficha.encontrada
            return (
              <button
                key={ficha.id}
                onClick={() => manejarClicFicha(ficha)}
                className={`ficha ${mostrarContenido ? "abierta" : "oculta"} ${
                  ficha.encontrada ? "encontrada" : ""
                }`}
              >
                {mostrarContenido ? ficha.valor : "?"}
              </button>
            )
          })}
        </section>
      )}

      {/* Marcadores del Footer */}
      <footer className="footer-marcador">
        <div className="tarjeta-marcador">
          <h3>Tiempo</h3>
          <p>{formatearTiempo()}</p>
        </div>
        <div className="tarjeta-marcador">
          <h3>Movimientos</h3>
          <p>{movimientos}</p>
        </div>
      </footer>
    </main>
  )
}
