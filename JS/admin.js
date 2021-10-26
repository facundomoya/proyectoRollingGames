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
let juegoExistente = false;
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
      agregarJuego();
    }
  } else {
    console.log("aqui no se crea un producto");
  }
}

function agregarJuego() {
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
  Swal.fire(
    "Producto agregado",
    "El producto fue agregado correctamente",
    "success"
  );
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
  <td>${game.nombre}</td>
  <td>${game.precio}<strong> USD</strong></td>
  <td><strong>${game.codigo}</strong></td>
  <td>${game.descripcion}</td>
  <td>${game.url}</td>
  <td>
    <button class="btn btn-success" onclick="prepararEdicionJuego('${game.codigo}')">Editar</button> 
    <button class="btn btn-danger" onclick="eliminarJuego('${game.codigo}')">Borrar</button>
  </td>
</tr>`;
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
  Swal.fire({
    title: "¿Está seguro que desea editar el producto?",
    text: "Una vez hechos los cambios, no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deseo hacerlo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
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
      limpiarFormulario();
      Swal.fire(
        "El producto ha sido editado",
        "Se edito correctamente",
        "success"
      );
    }
  });
}

function borrarFilas() {
  let tabla = document.querySelector("#tablaJuegos");
  tabla.innerHTML = "";
}

window.eliminarJuego = (cod) => {
  Swal.fire({
    title: "¿Está seguro que desea borrar el elemento seleccionado?",
    text: "El elemento se borrara por completo",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deseo hacerlo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let _listaJuegos = listaJuegos.filter((game) => {
        return game.codigo != cod;
      });
      console.log(_listaJuegos);
      Swal.fire(
        "El elemento se borro",
        "Se elimino el elemento completamente",
        "success"
      );
      listaJuegos = _listaJuegos;
      localStorage.setItem("listaJuegosKey", JSON.stringify(listaJuegos));
      borrarFilas();
      listaJuegos.forEach((game) => {
        crearFila(game);
      });
      limpiarFormulario();
      Swal.fire(
        "El producto ha sido eliminado",
        "Se elimino correctamente",
        "success"
      );
    }
  });
};
