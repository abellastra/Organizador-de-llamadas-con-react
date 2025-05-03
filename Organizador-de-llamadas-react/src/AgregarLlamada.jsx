import { useState } from "react";
 function AgreagrLlamadas({ setAddLlamada, setLlamads }) {
   const [mensajeError, setMensajeError] = useState({
     error1: "",
     error2: "",
     error3: "",
   });
   const [nuevaLlamada, setNevaLlamada] = useState({
     origen: 0,
     destino: 0,
     duracion: 0,
   });

   function validar() {
     let error = false;
     if (nuevaLlamada.origen.toString().length !== 10) {
       console.log(1);
       setMensajeError((prev) => ({ ...prev, error1: "numero invalido" }));
       error = true;
       console.log(mensajeError.error1);
     } else {
       setMensajeError((prev) => ({ ...prev, error1: "" }));
     }

     if (nuevaLlamada.destino.toString().length !== 10) {
       setMensajeError((prev) => ({ ...prev, error2: "numero invalido" }));
       console.log(mensajeError.error2);
       error = true;
       console.log(2);
     } else {
       setMensajeError((prev) => ({ ...prev, error2: "" }));
     }

     if (nuevaLlamada.duracion < 30 || nuevaLlamada.duracion > 600) {
       setMensajeError((prev) => ({
         ...prev,
         error3: "El valor tine que ser entre 30 y 600",
       }));
       error = true;
     } else {
       setMensajeError((prev) => ({
         ...prev,
         error3: "",
       }));
     }
     if (!error) {
       guardarcambios();
     }
   }
   async function guardarcambios() {
     const respuesta = await fetch(
       "http://localhost:3000/generar-NuevoTelefono",
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(nuevaLlamada),
       }
     );
     const data = await respuesta.json();
     setLlamads(data)
     setAddLlamada(null)
   }
   return (
     <div className="inset-0 backdrop-blur-md bg-black/50  rounded-xl absolute flex flex-col justify-center items-center p-5">
       <h3 className="border bg-[#fff] p-2 rounded-xl p-3">añadir llamada ✏</h3>
       <label>origen:</label>
       <input
         className="m-2 border text-center bg-[#fff] rounded-xl p-2"
         type="number"
         onChange={(e) => {
           setNevaLlamada({ ...nuevaLlamada, origen: e.target.value });
         }}
       />

       <p className="text-red-500 text-xl font-bold	">{mensajeError.error1}</p>

       <label>destino:</label>
       <input
         className="m-2 border text-center bg-[#fff] rounded-xl p-2"
         type="number"
         onChange={(e) => {
           setNevaLlamada({ ...nuevaLlamada, destino: e.target.value });
         }}
       />
       <p className="text-red-500 text-xl font-bold">{mensajeError.error2}</p>

       <label>duracion:</label>
       <input
       
         className="m-2 border text-center bg-[#fff] rounded-xl p-2"
         type="number"
         onChange={(e) => {
           setNevaLlamada({ ...nuevaLlamada, duracion: e.target.value });
         }}
       />
       <p className="text-red-500 text-xl font-bold">{mensajeError.error3}</p>
       <div>
         <button
           className="m-2 border rounded-xl p-1 bg-green-100 hover:bg-[#00ff24]"
           onClick={validar}
         >
           guardar cambios
         </button>

         <button
           className="m-2 border rounded-xl p-1 bg-red-100 hover:bg-[#ff0441]"
           onClick={() => {
             setMensajeError({ error1: "", error2: "", error3: "" });
             setAddLlamada(null);
           }}
         >
           cancelar
         </button>
       </div>
     </div>
   );
 }
    export default AgreagrLlamadas