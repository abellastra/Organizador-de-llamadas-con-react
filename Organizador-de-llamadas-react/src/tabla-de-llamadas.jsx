
function Tablallamadas({ llamadas, borraLlamada, llamadaEditada }) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>origen</th>
          <th>destino</th>
          <th>duracion</th>
        </tr>
      </thead>
      <tbody>
        {llamadas.map((Llamadas, index) => (
          <tr key={index}>
            <td>{Llamadas.origen}</td>
            <td>{Llamadas.destino}</td>
            <td>{Llamadas.duracion}</td>
            <td>
              <button onClick={() => borraLlamada(index)}>borrar</button>
            </td>
            <td>
              <button onClick={()=>llamadaEditada(llamadas)}>editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Tablallamadas