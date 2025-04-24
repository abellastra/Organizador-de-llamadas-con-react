import mysql, { QueryError } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // <- agrega esto
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conexion.connect((err:QueryError|null) => {
  if (err) {
    console.error("erro al conectarce a la base de datos", err);
  } else {
    console.log("conectado a la base de datos de llamadas-db");
  }
});
