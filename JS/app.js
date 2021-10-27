//este archivo llevara la logica del archivo index.html
//declarar variables
let juegos = [];

function cargaInicial() {
  juegos = JSON.parse(localStorage.getItem("listaJuegosKey")) || [];

  //si hay datos dentro, dibujo las columnas con CARDS
  if (juegos.length != 0) {
    //aqui dibujo las cards
    //con el forEach recorro cada elemento del arreglo
    juegos.forEach(producto=>{crearColumna(producto)})//la palabra producto es el indice del forEach que recorre cada elemento del arreglo
    //mientras que recorre cada elemento de ese arreglo crea las cards
    //se envia por parametro el producto para que la funcion crearColumna sepa que card crear
    
}

}

function crearColumna(producto) {
  let grilla = document.getElementById("grillaJuegos");
  grilla += `<div class="col-sm-12 col-md-4 col-lg-3 mb-3">
    <div class="card">
      <img src="${producto.url}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title text-success text-center">FIFA 22</h5>
        <p class="card-text text-center">${producto.descripcion}</p>
        <p>${producto.precio}</p>
      </div>
    </div>
  </div>`;
}

cargaInicial()