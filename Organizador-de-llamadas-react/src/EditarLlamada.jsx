function EditarLlamada({
  setMensajeError1,
  mensajeError1,
  VerificarDatos,
  llamadaEditada,
  setLlamads,
  setllamadaAEditar,
  setLlamadaEditada,
}) {
  function verificar() {
    const { errores, hayErrores } = VerificarDatos(llamadaEditada);
    setMensajeError1(errores);
    console.log(hayErrores);
    if (!hayErrores) {
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
    console.log("esta guardando");

    const data = await respuesta.json();
    setLlamads(data);
    console.log("data recibida", data);
    setllamadaAEditar(null);
  }

  return (
    <div className="inset-0 backdrop-blur-md bg-black/50  rounded-xl absolute flex flex-col justify-center items-center p-5">
      <h3 className="border bg-[#fff] p-2 rounded-xl p-3">Editar llamada ✏ </h3>
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

      <p className="text-red-500 text-xl font-bold	">{mensajeError1.error1}</p>

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
      <p className="text-red-500 text-xl font-bold">{mensajeError1.error2}</p>

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
      <p className="text-red-500 text-xl font-bold">{mensajeError1.error3}</p>
      <div>
        <button
          className="m-2 border rounded-xl p-1 bg-green-100 hover:bg-[#00ff24]"
          onClick={verificar}
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
  );
}
export default EditarLlamada;
