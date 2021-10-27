let juegos = [];

cargaInicial();

function cargaInicial() {
  juegos = JSON.parse(localStorage.getItem("listaJuegosKey")) || [];

  if (juegos.length != 0) {
    juegos.forEach((producto) => {
      crearColumna(producto);
    });
  }
}
function crearColumna(producto) {
  let grilla = document.getElementById("grillaJuegos");
  grilla.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-3 mb-3">
    <div class="card">
      <img src="${producto.url}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body colorfondocards">
        <h5 class="card-title text-center"><b class="text-dark">${producto.nombre}</b></h5>
        <hr class="text-dark">
        <p class="card-text text-center text-dark">${producto.descripcion}</p>
        <p class="card-text text-center text-dark">${producto.precio}<strong class="text-dark"> USD</strong></p>
      </div>
    </div>
  </div>`;
}
