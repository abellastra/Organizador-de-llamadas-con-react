import cors from "cors";
import express, { Request, Response } from "express";
import { conexion } from "./db";

import { QueryError } from "mysql2";

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());



async function generarLlamadas(cantidadLlamadas: number) {
  let duracionTotal = 0;
  await new Promise<void>((resolve, reject) => {
    conexion.query("DELETE FROM llamadas", (err: QueryError | null) => {
      if (err) {
        console.error("error al borrar la llamadas viejas al actualizar", err);
        reject(err);
      } else {
        console.log("llamadas anteeriores borradas");
        resolve();
      }
    });
  });
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
          resolve(  );
        }
      });
    });

   
  }
  const [resultadoDB] = await conexion
    .promise()
    .execute("SELECT * FROM llamadas");
  console.log(resultadoDB);

  const duracionPromedio = duracionTotal / cantidadLlamadas;
  return { llamadas: resultadoDB, duracionTotal, duracionPromedio };
}


app.get("/llamadas", async (req, res) => {
  try {
    const [llamadasGuardadas] = await conexion
      .promise()
      .execute("SELECT * FROM llamadas");
    res.json(llamadasGuardadas);
  } catch (error) {
    console.log("no se pudieron cargar las llamadas ", error);
    res.status(500).json({ error: "no se pudieron cargar las llamadas " });
  }
});



app.post("/generar-telefonos", async (req, res) => {
  const cantidadLlamadas = req.body.cantidad;
  try {
    const { llamadas, duracionTotal, duracionPromedio } = await generarLlamadas(
      cantidadLlamadas
    );
    res.json({ llamadas, duracionTotal, duracionPromedio });
  } catch (error) {
    console.error("Error al generar llamadas ", error);
    res.status(500).json({ error: "error al generrar llamadas" });
  }
});



app.post("/generar-NuevoTelefono",(req, res) => {
  const { origen, destino, duracion } = req.body
  console.log(origen,destino,duracion)
  const query = "INSERT INTO llamadas (origen ,destino,duracion) VALUES(?,?,?)";
  const valores = [origen, destino, duracion];
  conexion.query(query, valores, (err, result) => {
    if (err) {
      console.log("No se pudo agregar la llamda ", err);
      return res.status(500).json({ error: "No se pudo agregar la llamda " });
    }
  });
  conexion.query("SELECT * FROM llamadas ", (err, result) => {
    if (err) {
      console.log("Erroer alobtener la llamada ");
      return res.status(500).json({ error: "error al obtener las llamadas " });
    }

    return res.json(result);
  });
});



app.put("/editar-telefonos", (req, res) => {
  const { llamadaEditada } = req.body;
  console.log(llamadaEditada, llamadaEditada.id);
  if (typeof llamadaEditada.id !== "number" || llamadaEditada.id < 0) {
    res.status(400).json({ error: "id inválido" });
    return;
  }

  if (
    llamadaEditada.origen.toString().length === 10 &&
    llamadaEditada.destino.toString().length === 10
  ) {
    const actualizarLlamada =
      "UPDATE llamadas SET origen =?,destino=?,duracion=? WHERE id=?";
    conexion.query(
      actualizarLlamada,
      [
        llamadaEditada.origen,
        llamadaEditada.destino,
        llamadaEditada.duracion,
        llamadaEditada.id,
      ],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "error al actualizar la llamada" });
        }

        conexion.query("SELECT * FROM llamadas ", (err, result) => {
          if (err) {
            console.log(typeof llamadaEditada.id,'llamada id');
            return res
              .status(500)
              .json({ error: "error al obtener las llamadas " });
          }

          return res.json(result);
        });
      }
    );
    return; 
  }
});

app.delete("/borrar-telefonos", (req, res) => {
  const { id} = req.body;
  if (id >= 0) {
    const borrarLlamada = "DELETE FROM llamadas WHERE id=?";

    conexion.query(borrarLlamada, [id], (err, result) => {
      if (err) {
        console.log(id);
        console.log("error al borrar la llamada ", err);
        return res.status(500).json({ error: "error al borrar " });
      }

      conexion.query("SELECT * FROM llamadas ", (err, result) => {
        if (err) {
          console.log(typeof id);

          return res
            .status(500)
            .json({ error: "error al obtener las llamadas " });
        }

        return res.json(result);
      });
    });
  }
});

app.listen(3000, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`);
});
