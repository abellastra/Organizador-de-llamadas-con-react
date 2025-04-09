
function Tablallamadas({ llamadas, borraLlamada, editar }) {
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
              <button onClick={() => borraLlamada(index) }>borrar</button>
            </td>
            <td>
              <button onClick={()=>editar(index)}>editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Tablallamadas