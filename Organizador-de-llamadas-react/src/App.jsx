import { useCallback, useEffect, useState } from "react";
import Tablallamadas from "./tabla-de-llamadas";
import "./App.css";
import ModalGenerico from "./ModalGenerico";
import AgreagrLlamadas from "./AgregarLlamada";
function App() {
  const [cantidadLlamadas, setCantidaLlamadas] = useState(0);
  const [llamadas, setLlamads] = useState([]);
  const [duracion, setDuracion] = useState(0);
  const [duracionPromedio, setDuracionPromedio] = useState(0);
  const [visivilidad, setVisivilidas] = useState(true);
  const [llamadaAEditar, setllamadaAEditar] = useState(null);
  const [idLlamada, setIdLlamada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [respuestaDelModal, setRespuestadelModal] = useState(false);

  const [llamadaEditada, setLlamadaEditada] = useState({
    origen: 0,
    destino: 0,
    duracion: 0,
  });
  const [mensajeError1, setMensajeError1] = useState({
    error1: "",
    error2: "",
    error3: "",
  });
  const [estadoDeCarga, setEstadoDeCarga] = useState(true);

  const[addLlamada,setAddLlamada]=useState(null)
  useEffect(() => {
    fetch("http://localhost:3000/llamadas")
      .then((res) => res.json())
      .then((data) => {
        setLlamads(data);
        setTimeout(() => {
          setEstadoDeCarga(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error al obtener las llamadas:", error);
      });
  }, []);

 function hayllamadas(){
if(llamadas.length>0){
  setModalOpen(true)
  console.log('abrir modal')
  
}  else{
  generarLlamadas()
  console.log("s guardo");
} 
 }
 useEffect(()=>{
  if(respuestaDelModal===true){
      generarLlamadas();
  console.log("s guardaro la nueva llamadas");

  }
setRespuestadelModal(false)
 },[respuestaDelModal])

  const generarLlamadas = async () => {
      const respuesta = await fetch("http://localhost:3000/generar-telefonos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cantidad: cantidadLlamadas }),
      });

      const data = await respuesta.json();
      setLlamads(data.llamadas);
      setDuracion(data.duracionTotal);
      setDuracionPromedio(data.duracionPromedio);
      setEstadoDeCarga(true);

      setTimeout(() => {
        setEstadoDeCarga(false);
      }, 1000);
  };

  async function borraLlamada(id) {
    const respuesta = await fetch("http://localhost:3000/borrar-telefonos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    const data = await respuesta.json();
    setLlamads(data);
  }

  function editar(index) {
    setllamadaAEditar(index);
    setLlamadaEditada({ ...llamadas[index] });
  }

  function verificarDatos() {
    let error = false;
    if (llamadaEditada.origen.toString().length !== 10) {
      console.log(1);
      setMensajeError1((prev) => ({ ...prev, error1: "numero invalido" }));
      error = true;
      console.log(mensajeError1.error1);
    } else {
      setMensajeError1((prev) => ({ ...prev, error1: "" }));
    }

    if (llamadaEditada.destino.toString().length !== 10) {
      setMensajeError1((prev) => ({ ...prev, error2: "numero invalido" }));
      console.log(mensajeError1.error2);
      error = true;
      console.log(2);
    } else {
      setMensajeError1((prev) => ({ ...prev, error2: "" }));
    }

    if (llamadaEditada.duracion < 30 || llamadaEditada.duracion > 600) {
      setMensajeError1((prev) => ({
        ...prev,
        error3: "El valor tine que ser entre 30 y 600",
      }));
      error = true;
    } else {
      setMensajeError1((prev) => ({
        ...prev,
        error3: "",
      }));
    }
    if (!error) {
      guaardarcambios();
    }
  }

  async function guaardarcambios() {
    const respuesta = await fetch("http://localhost:3000/editar-telefonos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        llamadaEditada: llamadaEditada,
      }),
    });
    const data = await respuesta.json();
    setLlamads(data);
    setllamadaAEditar(null);
  }

  const actualizarDuracion = useCallback(() => {
    let nuevaDuracion = 0;

    for (let i = 0; i < llamadas.length; i++) {
      nuevaDuracion += Number(llamadas[i].duracion);
    }
    setDuracion(nuevaDuracion);
    setDuracionPromedio(parseInt(nuevaDuracion / llamadas.length));
  }, [llamadas]);

  useEffect(() => {
    actualizarDuracion();
  }, [llamadas, actualizarDuracion]);

  return (
    <>
      <ModalGenerico isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          SEGURO QUE QUIERE GENERAR LLAMADAS
        </h2>
        <p>Ya tenes {llamadas.length} llamadas guardadas .</p>
        <button
          onClick={() => {
            setRespuestadelModal(true), setModalOpen(false);
          }}
          className="mt-4 bg-blue-600 hover:bg-blued-700 text-white px-4 py-2 m-2 rounded"
        >
          aceptar
        </button>
        <button
          onClick={() => {
            setModalOpen(false),
              setRespuestadelModal(false),
              setCantidaLlamadas(0);
          }}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </ModalGenerico>
      {idLlamada !== null && (
        <>
          <div className=" inset-0 backdrop-blur-md bg-black/50  rounded-xl absolute flex flex-col justify-center items-center p-5">
            <h3 className="backdrop-blur-md bg-red-500/60 p-5 rounded-xl mb-10 text-3xl	">
              {" "}
              ELIMINAR❌{" "}
            </h3>
            <h4 className="text-xl	mb-11 bg-white p-5 border-3 rounded-xl ">
              {" "}
              DESEA ELIMINAR ESTA LLAMADA DE :{idLlamada.origen} A :
              {idLlamada.destino}
            </h4>

            <div>
              <button
                className="mr-1 border bg-red-100 p-2 rounded-xl hover:bg-[#ff0441]"
                onClick={() => {
                  borraLlamada(idLlamada.id), setIdLlamada(null);
                }}
              >
                Eliminar
              </button>
              <button
                className="border bg-green-100 p-2 rounded-xl hover:bg-[#00ff24]"
                onClick={() => setIdLlamada(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col items-center">
        {llamadaAEditar !== null && llamadaEditada && (
          <div className="inset-0 backdrop-blur-md bg-black/50  rounded-xl absolute flex flex-col justify-center items-center p-5">
            <h3 className="border bg-[#fff] p-2 rounded-xl p-3">
              editar llamada ✏
            </h3>
            <label>origen:</label>
            <input
              className="m-2 border text-center bg-[#fff] rounded-xl p-2"
              type="number"
              value={llamadaEditada.origen}
              onChange={(e) => {
                setLlamadaEditada({
                  ...llamadaEditada,
                  origen: e.target.value,
                });
              }}
            />

            <p className="text-red-500 text-xl font-bold	">
              {mensajeError1.error1}
            </p>

            <label>destino:</label>
            <input
              className="m-2 border text-center bg-[#fff] rounded-xl p-2"
              type="number"
              value={llamadaEditada.destino}
              onChange={(e) => {
                setLlamadaEditada({
                  ...llamadaEditada,
                  destino: e.target.value,
                });
              }}
            />
            <p className="text-red-500 text-xl font-bold">
              {mensajeError1.error2}
            </p>

            <label>duracion:</label>
            <input
              className="m-2 border text-center bg-[#fff] rounded-xl p-2"
              type="number"
              value={llamadaEditada.duracion}
              onChange={(e) => {
                setLlamadaEditada({
                  ...llamadaEditada,
                  duracion: e.target.value,
                });
              }}
            />
            <p className="text-red-500 text-xl font-bold">
              {mensajeError1.error3}
            </p>
            <div>
              <button
                className="m-2 border rounded-xl p-1 bg-green-100 hover:bg-[#00ff24]"
                onClick={verificarDatos}
              >
                guardar cambios
              </button>

              <button
                className="m-2 border rounded-xl p-1 bg-red-100 hover:bg-[#ff0441]"
                onClick={() => {
                  setllamadaAEditar(null);
                  setMensajeError1({ error1: "", error2: "", error3: "" });
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
        <div className="mb-5 bg-[#fff] p-3 rounded-xl">
          <input
            className="mb-2 m-1 text-center border w-31"
            type="number"
            id="numerosFicticios"
            onChange={(e) => setCantidaLlamadas(Number(e.target.value))}
          />
          <button
            id="button"
            className="rounded-xl bg-[#3300FF] hover:bg-[#000066] ... w-fit px-7 py-1"
            onClick={hayllamadas}
          >
            generar
          </button>
        </div>
        {estadoDeCarga ? (
          <div className="loader"></div>
        ) : llamadas.length > 0 ? (
          <>
            <Tablallamadas
              llamadas={llamadas}
              borraLlamada={borraLlamada}
              editar={editar}
              setIdLlamada={setIdLlamada}
            />
            <button
              className=" bg-gray-900/100 border rounded-xl p-2 text-white"
              onClick={() => setVisivilidas(!visivilidad)}
            >
              {visivilidad ? "Mostrar promedios" : "ocultar promedios"}{" "}
            </button>

            <button
              className="bg-gray-900/100 border rounded-xl p-2 text-white"
              onClick={()=>setAddLlamada(true)}
            >
              add llamada
            </button>
            {addLlamada !== null && <AgreagrLlamadas setAddLlamada= {setAddLlamada} setLlamads={setLlamads}/>}

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
    </>
  );
}

export default App;
