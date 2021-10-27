export function validarCampo(input) {
  if (input.value.trim().length != 0 && input.value.trim().length >= 3) {
    input.className = "is-valid form-control";
    return true;
  } else {
    console.log("dato incorrecto");
    input.className = "is-invalid form-control";
    return false;
  }
}

import{encontrarCodigo} from "./admin.js"

export function validarCodigo(input) {
  let bool = false
  let bool2=encontrarCodigo(codigo.value,bool)
  console.log(bool2)
  let patron = /^[0-9]{3}[-][A-Z]{3}$/;
  if (patron.test(input.value) && bool2==false) {
    input.className = "is-valid form-control";
    return true;
  } else {
    input.className = "is-invalid form-control";
    return false;
  }
}


export function validarPrecio(input) {
  if (input.value.trim() != "" && input.value.trim() > 0) {
    input.className = "is-valid form-control";
    return true;
  } else {
    input.className = "is-invalid form-control";
    return false;
  }
}

export function validarURL(input) {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    input.className = "is-valid form-control";
    return true;
  } else {
    input.className = "is-invalid form-control";
    return false;
  }
}

export function validarGeneral() {
  let alerta = document.querySelector("#alerta");
  if (
    validarPrecio(document.querySelector("#precio")) &&
    validarCampo(document.querySelector("#nombre")) &&
    validarCampo(document.querySelector("#descripcion")) &&
    validarURL(document.querySelector("#url")) &&
    validarCodigo(document.querySelector("#codigo"))
  ) {
    console.log("validacion correcta");
    alerta.className = "alert alert-success d-none my-3";
    return true;
  } else {
    console.log("validacion incorrecta");
    alerta.className = "alert alert-danger my-3";
    return false;
  }
}
