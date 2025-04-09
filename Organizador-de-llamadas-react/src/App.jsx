import { useState } from 'react'
import Tablallamadas from './tabla-de-llamadas';
import './App.css'

function App() {
  const[cantidadLlamadas, setCantidaLlamadas]=useState(0);
  const [llamadas, setLlamads] = useState([]);
  const [duracion,setDuracion]=useState(0);
  const [duracionPromedio,setDuracionPromedio]=useState(0)
  const[ visivilidad,setVisivilidas]=useState(true)
  const[llamadaAEditar,setllamadaAEditar]=useState(null)
  const[llamadaEditada,setLlamadaEditada]=useState({origen:0,destino:0,duracion:0})
  
  
  const generarLlamadas = async () => {
    const respuesta = await fetch("http://localhost:3000/generar-telefonos", 
        {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({ cantidad: cantidadLlamadas }),
    });

     const data = await respuesta.json();
     console.log(data.duracionTotal)
     setLlamads(data.llamadas);
     setDuracion(data.duracionTotal);
     setDuracionPromedio(data.duracionPromedio);
 };
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
  setllamadaAEditar(index)
  setLlamadaEditada({...llamadas[index]})
 }

 function guaardarcambios(){
  const nuevasLlamadas=[...llamadas]

  nuevasLlamadas[llamadaAEditar] = { ...llamadaEditada };
  console.log(nuevasLlamadas) 
  setLlamads(nuevasLlamadas)

 }

  return (
    <>
      {llamadaAEditar !== null && llamadaEditada && (
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
              setllamadaAEditar(null);
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
      <button id="button" onClick={generarLlamadas}>
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
