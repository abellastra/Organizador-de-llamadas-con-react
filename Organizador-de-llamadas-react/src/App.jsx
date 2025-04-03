import { useState } from 'react'
import Tablallamadas from './tabla-de-llamadas';
import './App.css'

function App() {
  const[cantidadLlamadas, setCantidaLlamadas]=useState(0);
  const [llamadas, setLlamads] = useState([]);
  const [duracion,setDuracion]=useState(0);
  const [duracionPromedio,setDuracionPromedio]=useState(0)
  const[ visivilidad,setVisivilidas]=useState(true)
  const[editorllamadas,setEditorllamadas]=useState(null)
  const[llamadaEditada,setLlamadaEditada]=useState({origen:0,destino:0,duracion:0})


 function generarLlamadas(cantidadLlamadas){
  const nuevasLLamadas=[]
  let duracionTotal =0
 for (let i = 0; i < cantidadLlamadas; i++) {
   let origen = Math.floor(
     Math.random() * (9999999999 - 1111111111) + 1111111111
   );
   let destino = Math.floor(
     Math.random() * (9999999999 - 1111111111) + 1111111111
   );
   let duracion = Math.floor(Math.random() * (600 - 30 + 1) + 30);
  nuevasLLamadas.push({ origen,destino,duracion });
  duracionTotal+=(nuevasLLamadas[i].duracion)
  
 }
    setLlamads(nuevasLLamadas);
    setDuracion(duracionTotal)
    setDuracionPromedio(duracionTotal/cantidadLlamadas)
 }
 function borraLlamada(index){
  if(window.confirm(`Desea eliminar la llamada de origen ${llamadas[index].origen} a destino ${llamadas[index].destino}`)){
    let nuevasLLamadas = llamadas.filter((a, i) => i !== index);
     let nuevaDuracion = 0;
       setLlamads(nuevasLLamadas)
       for(let i = 0; i < nuevasLLamadas.length; i++){
        nuevaDuracion+=nuevasLLamadas[i].duracion
       }
        setDuracion(nuevaDuracion)
        setDuracionPromedio(parseInt(nuevaDuracion / nuevasLLamadas.length));
  }
  
 }
 function editar(index){
  setEditorllamadas(index)
  setLlamadaEditada({...llamadas[index]})
 }
 function guaardarcambios(){
  const nuevasLlamadas=[...llamadas]

  nuevasLlamadas[editorllamadas] = { ...llamadaEditada };
  console.log(nuevasLlamadas)
  setLlamads(nuevasLlamadas)
  // setEditorllamadas(false)

 }
  return (
    <>
      {editorllamadas !== null && llamadaEditada && (
        <>
          <h3>editar llamada ✏</h3>
          <label>origen:</label>
          <input
            type="number"
            value={llamadaEditada.origen}
            onChange={(e) => {
              setLlamadaEditada({ ...llamadaEditada, origen: e.target.value });
            }}
          />

          <label>destino:</label>
          <input
            type="number"
            value={llamadaEditada.destino}
            onChange={(e) => {
              setLlamadaEditada({ ...llamadaEditada, destino: e.target.value });
            }}
          />
          <label>duracion:</label>
          <input
            type="number"
            value={llamadaEditada.duracion}
            onChange={(e) => {
              setLlamadaEditada({
                ...llamadaEditada,
                duracion: e.target.value,
              });
            }}
          />
          <button onClick={guaardarcambios}>guardar cambios</button>
          <button
            onClick={() => {
              setEditorllamadas(null);
              setLlamadaEditada({ origen: 0, destino: 0, duracion: 0 });
            }}
          >
            cancelar
          </button>
        </>
      )}
      <h1>Listar llamadas</h1>
      <label htmlFor="numerosFicticios"></label>
      <input
        type="number"
        id="numerosFicticios"
        onChange={(e) => setCantidaLlamadas(Number(e.target.value))}
      />
      <button id="button" onClick={() => generarLlamadas(cantidadLlamadas)}>
        generar
      </button>
      {llamadas.length > 0 ? (
        <>
          <Tablallamadas
            llamadas={llamadas}
            borraLlamada={borraLlamada}
            editar={editar}
          />
          <button onClick={() => setVisivilidas(!visivilidad)}>
            {visivilidad ? "Mostrar promedios" : "ocultar promedios"}{" "}
          </button>

          <table id="tabla" border={1} hidden={visivilidad}>
            <thead>
              <tr>
                <th>duracion total</th>
                <th>duracion promedio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{duracion}</td>
                <td>{duracionPromedio}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>no hay llamadas</p>
      )}
    </>
  );
}

export default App
