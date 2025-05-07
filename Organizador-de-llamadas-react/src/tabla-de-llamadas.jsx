function Tablallamadas({
  llamadas,
  setllamadaAEditar,
  setIdLlamada,
  setLlamadaEditada,
}) {
  function editar(index) {
    setllamadaAEditar(index);
    setLlamadaEditada({ ...llamadas[index] });
  }
  return (
    <div className=" h-[500px] overflow-y-auto border rounded">
      <table className="border bg-gray-900/100 mb-2  text-white">
        <thead>
          <tr className="border-2">
            <th className="border p-2">origen</th>
            <th className="border p-2">destino</th>
            <th className="border p-2">duracion</th>
          </tr>
        </thead>
        <tbody>
          {llamadas.map((llamada, index) => (
            <>
              <tr key={index}>
                <td className="border p-4 "> {llamada.origen}</td>
                <td className="border p-4">{llamada.destino}</td>
                <td className="border p-4">{llamada.duracion}</td>
                <td className="p-2 border">
                  <button
                    className="mr-1 border bg-red-100 p-2 rounded-xl text-black hover:bg-[#ff0441]"
                    onClick={() => setIdLlamada(llamadas[index])}
                  >
                    borrar
                  </button>
                  <button
                    className="border bg-green-100 p-2 rounded-xl text-black  hover:bg-[#00ff24]"
                    onClick={() => {
                      editar(index);
                    }}
                  >
                    editar
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Tablallamadas;
