import cors from "cors";
import express, { Request, Response } from "express";
import { conexion } from "./db";

import { QueryError } from "mysql2";

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());

let nuevasLLamadas: {
  origen: number;
  destino: number;
  duracion: number;
}[] = [];

 async function generarLlamadas(cantidadLlamadas: number) {
  nuevasLLamadas=[]
  let duracionTotal = 0;
  await new Promise<void>((resolve,reject)=>{
  conexion.query("DELETE FROM llamadas",(err:QueryError|null)=>{
  if (err) {
          console.error("error al borrar la llamadas viejas al actualizar", err);
          reject(err);
        } else {
          console.log("llamadas anteeriores borradas")
          resolve();
        }
  })
  })
  for (let i = 0; i < cantidadLlamadas; i++) {
    let origen = Math.floor(
      Math.random() * (9999999999 - 1111111111) + 1111111111
    );
    let destino = Math.floor(
      Math.random() * (9999999999 - 1111111111) + 1111111111
    );
    let duracion = Math.floor(Math.random() * (600 - 30 + 1) + 30);

    const query =
      "INSERT INTO llamadas (origen ,destino,duracion) VALUES(?,?,?)";
    const valores = [origen, destino, duracion];
    await new Promise<void>((resolve, reject) => {
      conexion.query(query, valores, (err: QueryError | null) => {
        if (err) {
          console.error("error al guardar ", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

     nuevasLLamadas.push({ origen, destino, duracion });

    duracionTotal += nuevasLLamadas[i].duracion;
  }
  const [resultadoDB] = await conexion
    .promise()
    .execute("SELECT * FROM llamadas");
  console.log(resultadoDB);

  const duracionPromedio = duracionTotal / cantidadLlamadas;
  return { llamadas: nuevasLLamadas, duracionTotal, duracionPromedio };
}
app.post("/generar-telefonos", async(req, res) => {
  const cantidadLlamadas = req.body.cantidad || 10;
  try{
  const { llamadas, duracionTotal, duracionPromedio } = await
    generarLlamadas(cantidadLlamadas);
  res.json({ llamadas, duracionTotal, duracionPromedio });
  }catch(error){
    console.error("Error al generar llamadas ",error)
    res.status(500).json({error:"error al generrar llamadas"})
  }
});

app.put("/editar-telefonos", (req, res) => {
  const { index, llamadaEditada } = req.body;
  if (
    typeof index !== "number" ||
    index < 0 ||
    index >= nuevasLLamadas.length
  ) {
    res.status(400).json({ error: "índice inválido" });
  } else if (
    llamadaEditada.origen.toString().length === 10 &&
    llamadaEditada.destino.toString().length === 10
  ) {
    nuevasLLamadas[index] = { ...llamadaEditada };
    res.json(nuevasLLamadas);
  }
});

app.delete("/borrar-telefonos", (req, res) => {
  const { index } = req.body;
  if (index >= 0) {
    nuevasLLamadas.splice(index, 1);
  }
  res.json(nuevasLLamadas);
});

app.listen(3000, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`);
});
