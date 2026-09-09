import { useState } from 'react'
import './App.css'

function App() {
  // --- ESTADOS ---
  const [longitud, setLongitud] = useState(10)
  const [conMayusculas, setConMayusculas] = useState(true)
  const [conMinusculas, setConMinusculas] = useState(true)
  const [conNumeros, setConNumeros] = useState(false)
  const [conSimbolos, setConSimbolos] = useState(false)
  
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [fortaleza, setFortaleza] = useState('')

  // --- FUNCIÓN 1: CALCULAR FORTALEZA ---
  const calcularFortaleza = (long, may, min, num, simb) => {
    if (long === 0 || (!may && !min && !num && !simb)) return ''
    
    let puntos = 0
    if (may) puntos++
    if (min) puntos++
    if (num) puntos++
    if (simb) puntos++
    if (long >= 12) puntos++

    if (puntos <= 1) return 'Muy débil'
    if (puntos === 2) return 'Débil'
    if (puntos === 3) return 'Media'
    return 'Fuerte'
  }

  // --- FUNCIÓN 2: GENERAR CONTRASEÑA ---
  const generarPassword = () => {
    // Validación 
    if (!conMayusculas && !conMinusculas && !conNumeros && !conSimbolos) {
      setError('¡Marcá al menos una opción!')
      setPassword('')
      setFortaleza('')
      return
    }
    if (longitud === 0) {
      setError('La longitud debe ser mayor a 0')
      setPassword('')
      setFortaleza('')
      return
    }

    setError('') // Limpiamos errores si es válido

    let permitidos = ''
    if (conMayusculas) permitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (conMinusculas) permitidos += 'abcdefghijklmnopqrstuvwxyz'
    if (conNumeros) permitidos += '0123456789'
    if (conSimbolos) permitidos += '!@#$%^&*()'

    let resultado = ''
    for (let i = 0; i < longitud; i++) {
      const indiceAzar = Math.floor(Math.random() * permitidos.length)
      resultado += permitidos[indiceAzar]
    }

    setPassword(resultado)
    // Actualizamos la fortaleza en vivo
    setFortaleza(calcularFortaleza(longitud, conMayusculas, conMinusculas, conNumeros, conSimbolos))
  }

  // --- FUNCIÓN 3: COPIAR AL PORTAPAPELES ---
  const copiarAlPortapapeles = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000) // Se apaga a los 2 segundos
  }

  // --- OBTENER COLOR DEL MEDIDOR ---
  const obtenerClaseFortaleza = () => {
    if (fortaleza === 'Muy débil') return 'muy-debil'
    if (fortaleza === 'Débil') return 'debil'
    if (fortaleza === 'Media') return 'media'
    if (fortaleza === 'Fuerte') return 'fuerte'
    return ''
  }

  return (
    <main className="app-container">
      <h1>Generador de contraseñas</h1>
      
      <section className="tarjeta">
        {/* Bloque del Visor */}
        <div className="visor-contenedor">
          <input 
            type="text" 
            readOnly 
            placeholder="P4$5W0rD!" 
            value={password}
          />
          <button 
            onClick={copiarAlPortapapeles} 
            disabled={!password}
            className="btn-copiar"
          >
            {copiado ? '¡Copiado!' : '📋'}
          </button>
        </div>

        {/* Formulario de opciones */}
        <div className="opciones-contenedor">
          
          {/* Slider de longitud */}
          <div className="fila-slider">
            <label>Longitud</label>
            <span className="numero-longitud">{longitud}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={longitud} 
            onChange={(e) => setLongitud(parseInt(e.target.value))}
            className="slider"
          />

          {/* Checkboxes de opciones */}
          <div className="grid-checkboxes">
            <label>
              <input 
                type="checkbox" 
                checked={conMayusculas} 
                onChange={(e) => setConMayusculas(e.target.checked)}
              />
              Incluir mayúsculas
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={conMinusculas} 
                onChange={(e) => setConMinusculas(e.target.checked)}
              />
              Incluir minúsculas
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={conNumeros} 
                onChange={(e) => setConNumeros(e.target.checked)}
              />
              Incluir números
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={conSimbolos} 
                onChange={(e) => setConSimbolos(e.target.checked)}
              />
              Incluir símbolos
            </label>
          </div>

          {/* Renderizado condicional de Error */}
          {error && <p className="mensaje-error">{error}</p>}

          {/* Medidor de Fortaleza */}
          {fortaleza && (
            <div className="fila-fortaleza">
              <span>FORTALEZA:</span>
              <span className={`badge-fortaleza ${obtenerClaseFortaleza()}`}>
                {fortaleza}
              </span>
            </div>
          )}

          {/* Botón de Generar */}
          <button onClick={generarPassword} className="btn-generar">
            GENERAR →
          </button>

        </div>
      </section>
    </main>
  )
}

export default App
