import {
  validarCampo,
  validarCodigo,
  validarPrecio,
  validarURL,
  validarGeneral,
} from "./validaciones.js";

import { Juego } from "./productClass.js";

export let listaJuegos = [];

let precio = document.querySelector("#precio");
let codigo = document.querySelector("#codigo");
let nombre = document.querySelector("#nombre");
let descripcion = document.querySelector("#descripcion");
let url = document.querySelector("#url");
let formulario = document.querySelector("#formPersona");
let contador = 0;
let juegoExistente = false; //false=tengo que agregar un producto nuevo pero si es true=tengo que modificar
let btnNuevo = document.querySelector("#btnAgregar");

precio.addEventListener("blur", function () {
  validarPrecio(precio);
});
codigo.addEventListener("blur", function () {
  validarCodigo(codigo);
});
nombre.addEventListener("blur", function () {
  validarCampo(nombre);
});
descripcion.addEventListener("blur", function () {
  validarCampo(descripcion);
});
url.addEventListener("blur", function () {
  validarURL(url);
});
formulario.addEventListener("submit", guardarPersona);
btnNuevo.addEventListener("click", limpiarFormulario);

cargaInicial();

function guardarPersona(e) {
  e.preventDefault();

  if (validarGeneral()) {
    if (juegoExistente == true) {
      actualizarJuego();
    } else {
      console.log("aqui se crea un producto");
      agregarPersona();
    }
  } else {
    console.log("aqui no se crea un producto");
  }
}

function agregarPersona() {
  let juegoNuevo = new Juego(
    nombre.value,
    precio.value,
    codigo.value,
    descripcion.value,
    url.value
  );

  listaJuegos.push(juegoNuevo);
  localStorage.setItem("listaJuegosKey", JSON.stringify(listaJuegos));

  limpiarFormulario();

  crearFila(juegoNuevo);
}

function cargaInicial() {
  listaJuegos = JSON.parse(localStorage.getItem("listaJuegosKey")) || [];

  console.log(listaJuegos);

  listaJuegos.forEach((game) => {
    crearFila(game);
  });
}

function crearFila(game) {
  let tabla = document.querySelector("#tablaJuegos");
  tabla.innerHTML += `<tr> 
  <td>${contador}</td>
  <td>${game.nombre}</td>
  <td>${game.precio}<strong> USD</strong></td>
  <td><strong>${game.codigo}</strong></td>
  <td>${game.descripcion}</td>
  <td>${game.url}</td>
  <td>
    <button class="btn btn-success" onclick="prepararEdicionJuego('${game.codigo}')">Editar</button> 
    <button class="btn btn-danger">Borrar</button>
  </td>
</tr>`;
  contador++;
}

function limpiarFormulario() {
  formulario.reset();

  codigo.className = "form-control";
  nombre.className = "form-control";
  precio.className = "form-control";
  descripcion.className = "form-control";
  url.className = "form-control";

  juegoExistente = false;
}

window.prepararEdicionJuego = (cod) => {
  let juegoEncontrado = listaJuegos.find((game) => {
    return game.codigo == cod;
  });
  console.log(juegoEncontrado);
  document.querySelector("#codigo").value = juegoEncontrado.codigo;
  document.querySelector("#nombre").value = juegoEncontrado.nombre;
  document.querySelector("#url").value = juegoEncontrado.url;
  document.querySelector("#descripcion").value = juegoEncontrado.descripcion;
  document.querySelector("#precio").value = juegoEncontrado.precio;

  codigo.className = "form-control disabled";

  juegoExistente = true;
};

function actualizarJuego() {
  console.log("aqui modifico amigo");
  let indiceJuego = listaJuegos.findIndex((game) => {
    return game.codigo == codigo.value;
  });
  console.log(indiceJuego);
  console.log(listaJuegos[indiceJuego]);

  listaJuegos[indiceJuego].nombre = document.querySelector("#nombre").value;
  listaJuegos[indiceJuego].descripcion =
    document.querySelector("#descripcion").value;
  listaJuegos[indiceJuego].precio = document.querySelector("#precio").value;
  listaJuegos[indiceJuego].url = document.querySelector("#url").value;

  localStorage.setItem("listaJuegosKey", JSON.stringify(listaJuegos));
  borrarFilas();
  listaJuegos.forEach((game) => {
    crearFila(game);
  });
}

function borrarFilas() {
  let tabla = document.querySelector("#tablaJuegos");
  tabla.innerHTML = "";
}
