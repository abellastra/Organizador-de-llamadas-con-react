export default function verificarDatos(llamada) {
  let error = false;
  const errores = {
    error1: "",
    error2: "",
    error3: "",
  };
  if (llamada.origen.toString().length !== 10) {
    console.log(1);
    errores.error1 = "numero invalido";
    error = true;
    console.log(errores.error1);
  } else {
    errores.error1 = "";
  }

  if (llamada.destino.toString().length !== 10) {
    errores.error2 = "numero invalido";
    console.log(errores.error2);
    error = true;
    console.log(2);
  } else {
    errores.error2 = "";
  }

  if (llamada.duracion < 30 || llamada.duracion > 600) {
    errores.error3 = "El valor tine que ser entre 30 y 600";


    error = true;
  } else {
     errores.error3 = "";

  
    }
    return {errores,hayErrores:error}


}
