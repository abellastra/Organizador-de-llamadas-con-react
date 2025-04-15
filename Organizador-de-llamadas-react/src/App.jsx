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
  setLlamads(nuevasLlamadas)
setllamadaAEditar(null)
 }



  return (
    <div className="flex flex-col items-center">
      {llamadaAEditar !== null && llamadaEditada && (
        <div className="inset-0 backdrop-blur-md bg-white/30  rounded-xl absolute flex flex-col justify-center items-center p-5">
          <h3 className="border bg-[#fff] p-2">editar llamada ✏</h3>
          <label>origen:</label>
          <input
            className="m-2 border text-center bg-[#fff]"
            type="number"
            value={llamadaEditada.origen}
            onChange={(e) => {
              setLlamadaEditada({ ...llamadaEditada, origen: e.target.value });
            }}
          />
          <label>destino:</label>
          <input
            className="m-2 border text-center bg-[#fff]"
            type="number"
            value={llamadaEditada.destino}
            onChange={(e) => {
              setLlamadaEditada({ ...llamadaEditada, destino: e.target.value });
            }}
          />
          <label>duracion:</label>
          <input
            className="m-2 border text-center bg-[#fff]"
            type="number"
            value={llamadaEditada.duracion}
            onChange={(e) => {
              setLlamadaEditada({
                ...llamadaEditada,
                duracion: e.target.value,
              });
            }}
          />
          <div>
            <button
              className="m-2 border rounded-xl p-1 bg-green-100 "
              onClick={guaardarcambios}
            >
              guardar cambios
            </button>
            <button
              className="m-2 border rounded-xl p-1 bg-red-100 "
              onClick={() => {
                setllamadaAEditar(null);
                setLlamadaEditada({ origen: 0, destino: 0, duracion: 0 });
              }}
            >
              cancelar
            </button>
          </div>
        </div>
      )}
      <h1 className="bg-[#000]  text-white text-3xl	 border font-bold w-fit p-4 mb-6 rounded-xl ">
        Listar llamadas
      </h1>
      <label
        className="mb-3 p-2 rounded-xl bg-[#fff] text-lg font-medium "
        htmlFor="numerosFicticios "
      >
        ingrese la cantidad de llamadas ficticias q quiere generar
      </label>
      <div className="mb-5 bg-[#fff] p-3 rounded-xl ">
        <input
          className="mb-2 m-1 text-center border w-31"
          type="number"
          id="numerosFicticios"
          onChange={(e) => setCantidaLlamadas(Number(e.target.value))}
        />
        <button
          id="button"
          class="rounded-xl bg-[#3300FF] hover:bg-[#000066] ... w-fit px-7 py-1"
          onClick={generarLlamadas}
        >
          generar
        </button>
      </div>

      {llamadas.length > 0 ? (
        <>
          <Tablallamadas
            llamadas={llamadas}
            borraLlamada={borraLlamada}
            editar={editar}
          />
          <button
            className=" bg-[#fff] border rounded-xl p-2"
            onClick={() => setVisivilidas(!visivilidad)}
          >
            {visivilidad ? "Mostrar promedios" : "ocultar promedios"}{" "}
          </button>

          <table
            className="border bg-[#fff]"
            id="tabla"
            border={1}
            hidden={visivilidad}
          >
            <thead>
              <tr>
                <th className="border p-1">duracion total</th>
                <th className="border p-1">duracion promedio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-1">{duracion}</td>
                <td className="border p-1">{duracionPromedio}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>no hay llamadas</p>
      )}
    </div>
  );
}

export default App
