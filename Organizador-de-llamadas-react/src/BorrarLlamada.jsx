function BorrarLlamadas({ idLlamada, setIdLlamada, setLlamads }) {
  async function borraLlamada(id) {
    const respuesta = await fetch("http://localhost:3000/borrar-telefonos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    const data = await respuesta.json();
    setLlamads(data);
  }

  return (
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
  );
}
export default BorrarLlamadas;
