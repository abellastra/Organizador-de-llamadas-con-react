import express from "express";
import cors from'cors'


const app = express();
const puerto=3000

app.use(cors())
app.use(express.json())

app.post("/generar-telefonos", (req, res) => {
  console.log("BODY RECIBIDO:", req.body);
  const cantidadLlamadas = req.body.cantidad||10;
  const { llamadas, duracionTotal, duracionPromedio } = generarLlamadas(cantidadLlamadas);
  res.json({ llamadas, duracionTotal, duracionPromedio });
});


function generarLlamadas(cantidadLlamadas) {
  const nuevasLLamadas = [];
  let duracionTotal = 0;
  for (let i = 0; i < cantidadLlamadas; i++) {
    let origen = Math.floor(
      Math.random() * (9999999999 - 1111111111) + 1111111111
    );
    let destino = Math.floor(
      Math.random() * (9999999999 - 1111111111) + 1111111111
    );
    let duracion = Math.floor(Math.random() * (600 - 30 + 1) + 30);
    nuevasLLamadas.push({ origen, destino, duracion });
    duracionTotal += nuevasLLamadas[i].duracion;
  }
  const duracionPromedio = duracionTotal / cantidadLlamadas;
return { llamadas: nuevasLLamadas, duracionTotal, duracionPromedio };
}

;

app.listen(3000, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`)
});
