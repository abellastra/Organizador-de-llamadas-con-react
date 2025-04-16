
function Tablallamadas({ llamadas, /*borraLlamada */ editar, setBottonBorrar }) {
  return (
    <div className=" h-[500px] overflow-y-auto border rounded">
      <table className="border bg-[#fff] mb-2 ">
        <thead>
          <tr className="border-2">
            <th className="border p-1">origen</th>
            <th className="border p-1">destino</th>
            <th className="border p-1">duracion</th>
          </tr>
        </thead>
        <tbody>
          {llamadas.map((Llamadas, index) => (
            <tr key={index}>
              <td className="border p-2"> {Llamadas.origen}</td>
              <td className="border p-2">{Llamadas.destino}</td>
              <td className="border p-2">{Llamadas.duracion}</td>
              <td className="p-2 border">
                <button
                  className="mr-1 border bg-red-100 p-2 rounded-xl hover:bg-[#ff0441]"
                  onClick={
                    () => setBottonBorrar(index) 
                  }
                >
                  borrar
                </button>
                <button
                  className="border bg-green-100 p-2 rounded-xl hover:bg-[#00ff24]"
                  onClick={() =>{ editar(index)}}
                >
                  editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Tablallamadas