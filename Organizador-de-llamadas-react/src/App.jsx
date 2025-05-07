import { useCallback, useEffect, useState } from "react";
import Tablallamadas from "./tabla-de-llamadas";
import "./App.css";
import ModalGenerico from "./ModalGenerico";
import AgreagrLlamadas from "./AgregarLlamada";
import VerificarDatos from "./VerificarDatos";
import BorrarLlamadas from "./BorrarLlamada";
import EditarLlamada from "./EditarLlamada";
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

  const [addLlamada, setAddLlamada] = useState(null);
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

  function hayllamadas() {
    //?
    if (llamadas.length > 0) {
      setModalOpen(true);
      console.log("abrir modal");
    } else {
      generarLlamadas();
      console.log("s guardo");
    }
  }
  useEffect(() => {
    if (respuestaDelModal === true) {
      generarLlamadas();
      console.log("s guardaro la nueva llamadas");
    }
    setRespuestadelModal(false);
  }, [respuestaDelModal]);

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
          SEGURO QUE QUIERE GENERAR {cantidadLlamadas} LLAMADAS
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
        <BorrarLlamadas
          idLlamada={idLlamada}
          setIdLlamada={setIdLlamada}
          setLlamads={setLlamads}
        />
      )}

      <div className="flex flex-col items-center">
        {llamadaAEditar !== null && llamadaEditada && (
          <EditarLlamada
            VerificarDatos={VerificarDatos}
            setMensajeError1={setMensajeError1}
            mensajeError1={mensajeError1}
            llamadaEditada={llamadaEditada}
            setLlamads={setLlamads}
            setllamadaAEditar={setllamadaAEditar}
            setLlamadaEditada={setLlamadaEditada}
          />
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
            className="rounded-xl ... w-fit px-7 py-1  text-white  bg-gradient-to-r from-black via-gray-800 to-blue-800  hover:text-black  "
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
              setllamadaAEditar={setllamadaAEditar}
              setIdLlamada={setIdLlamada}
              setLlamadaEditada={setLlamadaEditada}
            />
            <button
              className=" bg-gray-900/100 border rounded-xl p-2 text-white"
              onClick={() => setVisivilidas(!visivilidad)}
            >
              {visivilidad ? "Mostrar promedios" : "ocultar promedios"}{" "}
            </button>

            <button
              className="bg-gray-900/100 border rounded-xl p-2 text-white"
              onClick={() => setAddLlamada(true)}
            >
              add llamada
            </button>
            {addLlamada !== null && (
              <AgreagrLlamadas
                setAddLlamada={setAddLlamada}
                setLlamads={setLlamads}
              />
            )}

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
          <p className=" text-4xl mt-20 bg-gray-600 p-4 rounded-xl">
            no hay llamadas
          </p>
        )}
      </div>
    </>
  );
}

export default App;
