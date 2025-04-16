import { useState } from "react";
import Tablallamadas from "./tabla-de-llamadas";
import "./App.css";

function App() {
  const [cantidadLlamadas, setCantidaLlamadas] = useState(0);
  const [llamadas, setLlamads] = useState([]);
  const [duracion, setDuracion] = useState(0);
  const [duracionPromedio, setDuracionPromedio] = useState(0);
  const [visivilidad, setVisivilidas] = useState(true);
  const [llamadaAEditar, setllamadaAEditar] = useState(null);
  const [bottonBorrar, setBottonBorrar] = useState(null);
  const [llamadaEditada, setLlamadaEditada] = useState({
    origen: "",
    destino: "",
    duracion: "",
  });
  const [mensajeError1, setMensajeError1] = useState({error1:'',error2:'',error3:''});
  const [mensajeError2, setMensajeError2] = useState("");

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
  };
  function borraLlamada(index) {
    if (borraLlamada !== null) {
      let nuevasLLamadas = llamadas.filter((a, i) => i !== index);
      setLlamads(nuevasLLamadas);

      let nuevaDuracion = 0;
      for (let i = 0; i < nuevasLLamadas.length; i++) {
        nuevaDuracion += nuevasLLamadas[i].duracion;
      }
      setDuracion(nuevaDuracion);
      setDuracionPromedio(parseInt(nuevaDuracion / nuevasLLamadas.length));
    }
  }
  function editar(index) {
    setllamadaAEditar(index);
    setLlamadaEditada({ ...llamadas[index] });
  }

  function guaardarcambios() {
    const nuevasLlamadas = [...llamadas];

    nuevasLlamadas[llamadaAEditar] = { ...llamadaEditada };
    setLlamads(nuevasLlamadas);
    setllamadaAEditar(null);
  }

  function verificarDatos() {
    let error = false;
    if (
      llamadaEditada.origen !== "" &&
      String(llamadaEditada.origen).length !== 10
    ) {
      setMensajeError1(prev=>({...prev,error1:"numero invalido"}));
      error = true;
    } else {
      setMensajeError1("");
    }

    if (
      llamadaEditada.destino !== "" &&
      String(llamadaEditada.destino).length !== 10
    ) {
      setMensajeError1(prev=>({...prev,error2:"numero invalido"}));
      error = true;
    } else {
      setMensajeError1("");
    }

     if(llamadaEditada.duracion<30 || llamadaEditada.duracion>600){
      setMensajeError1(prev=>({...prev, error3:'El valor tine que ser entre 30 y 600'}))
      error=true;
     }else{
            setMensajeError1((prev) => ({
              ...prev,
              error3: "",
            }));

     }





    if (!error) {
      guaardarcambios();
    }


  }
  // console.log(llamadaEditada.duracion < 600 && llamadaEditada.duracion>30);
  return (
    <>
      {bottonBorrar !== null && (
        <div className=" inset-0 backdrop-blur-md bg-black/50  rounded-xl absolute flex flex-col justify-center items-center p-5">
          <h3 className="backdrop-blur-md bg-red-500/60 p-5 rounded-xl mb-10 text-3xl	">
            {" "}
            ELIMINAR❌{" "}
          </h3>
          <h4 className="text-lg	mb-10 bg-white p-5 border-3 rounded-xl ">
            {" "}
            DESEA ELIMINAR ESTA LLAMADA DE:{llamadas[bottonBorrar].origen} A :
            {llamadas[bottonBorrar].destino}
          </h4>

          <div>
            <button
              className="mr-1 border bg-red-100 p-2 rounded-xl hover:bg-[#ff0441]"
              onClick={() => {
                borraLlamada(bottonBorrar), setBottonBorrar(null);
              }}
            >
              Eliminar
            </button>
            <button
              className="border bg-green-100 p-2 rounded-xl hover:bg-[#00ff24]"
              onClick={() => setBottonBorrar(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
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
            {mensajeError1 && (
              <p className="text-red-500 text-xl font-bold	">
                {mensajeError1.error1}
              </p>
            )}

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
            {mensajeError1.error2 !== "" && (
              <p className="text-red-500 text-xl font-bold">
                {mensajeError1.error2}
              </p>
            )}

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
              { mensajeError1.error3}
              
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
        <div className="mb-5 bg-[#fff] p-3 rounded-xl ">
          <input
            className="mb-2 m-1 text-center border w-31"
            type="number"
            id="numerosFicticios"
            onChange={(e) => setCantidaLlamadas(Number(e.target.value))}
          />
          <button
            id="button"
            className="rounded-xl bg-[#3300FF] hover:bg-[#000066] ... w-fit px-7 py-1"
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
              setBottonBorrar={setBottonBorrar}
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
    </>
  );
}

export default App;
