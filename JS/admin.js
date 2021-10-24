import {
  validarCampo,
  validarCodigo,
  validarPrecio,
  validarURL,
  validarGeneral,
} from "./validaciones.js";

import { Juego } from "./productClass.js";

let listaJuegos = [];

let precio = document.querySelector("#precio");
let codigo = document.querySelector("#codigo");
let nombre = document.querySelector("#nombre");
let descripcion = document.querySelector("#descripcion");
let url = document.querySelector("#url");
let formulario = document.querySelector("#formPersona");
let contador = 0;
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

cargaInicial();

function guardarPersona(e) {
  e.preventDefault();

  if (validarGeneral()) {
    console.log("aqui se crea un producto");
    agregarPersona();
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
}

//buscar el objeto dentro del arreglo, game es cada item del arreglo
window.prepararEdicionJuego = (cod) => {
  //juegoEncontrado es la variable que contendra el elemento buscado
  let juegoEncontrado = listaJuegos.find((game) => {
    return game.codigo == cod;
  });
  //le pido que returne donde el codigo del objeto esta dentro del arreglo es exactamente igual al codigo que recibi por parametro
  console.log(juegoEncontrado);
};
