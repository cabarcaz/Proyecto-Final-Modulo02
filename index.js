
const baseDeDatos = [
    {
        id: 1,
                nombre: "PC GAME Crysis Warhead",
        precio: 1000,
        imagen: "https://aux.iconspalace.com/uploads/1614758672232510841.png"

    },
    {
        id:2,
        nombre: "PC GAME Mount & Blade",
        precio: 1000,
        imagen: "https://aux.iconspalace.com/uploads/19245604371472085559.png"
    },
    {
        id:3,
                nombre: "PC GAME Stranglehold",
        precio: 1000,
        imagen: "https://aux.iconspalace.com/uploads/2054722076565361177.png"

    },
    {
        id:4,
        nombre: "PC GAME Team Fortress 2",
        precio: 1000,
        imagen: "https://aux4.iconspalace.com/uploads/836564662833596194.png"
    },
    {
        id:5,
        nombre: "PC GAME Doom 3",
        precio: 1000,
        imagen: "https://aux.iconspalace.com/uploads/18600674542003481910.png"
    },
    {
        id:6,
        nombre: "PC GAME The Witcher Enhanced Edition",
        precio: 1000,
        imagen: "https://aux.iconspalace.com/uploads/16331055941707220572.png"
    },
    {
        id:7,
        nombre: "PC GAME Unreal Tournament 3",
        precio: 1000,
        imagen: "https://aux.iconspalace.com/uploads/210510018424822349.png"
    },
    {
        id:8,
        nombre: "PC GAME Empire Earth 3",
        precio: 1000,
        imagen: "https://aux3.iconspalace.com/uploads/6354194641088929997.png"



    }

];

const containerProductos = document.getElementById('container-productos') ;

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnAnterior = document.getElementById('btnAnterior');

let DOMconteoProductos = document.querySelector('#badge');
let contadorProductos = 0;
let offsetLet=0;
let validador = 0;

btnSiguiente.addEventListener('click', () => {
  if (offsetLet == 0 && validador == 0) {
    obtenerProducto();
    validador = 1;
  }else{
    offsetLet += 8;
    obtenerProducto();
  }
});
btnAnterior.addEventListener('click', () => {
  if(offsetLet >=8){
    offsetLet -= 8;
    obtenerProducto();
  }else{
    validador = 0;
    mostrarProducto();
  }
});

const isOk = true;
const customFetch = (time,task) => {
  return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(isOK) {
                resolve(task);
            } else {
                reject("Error");
            }
        });
    }, time);
};

const obtenerProducto = async () => {
      const respuesta = await axios.get('https://api.mercadolibre.com/sites/MLC/search?q=videogames', {
        params: {
            limit: 8,
            offset: offsetLet
        }
    });
    printProducto(respuesta);
};

const printProducto=(respuesta) => {
  let products = '';
    items = [];
    respuesta.data.results.forEach(product => {
        let obj =  {
            id: product.id,
            title: product.title,
            price: product.price,
            img: `http://http2.mlstatic.com/D_${product.thumbnail_id}-I.jpg`
        };
        products += `
        <div class="col">
          <div class="card">
            <div class="card-body">
            <img class="img-fluid " alt="..." src="http://http2.mlstatic.com/D_${product.thumbnail_id}-I.jpg">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">Precio: ${divisa}${product.price}</p>
              <button class="btn btn-primary" marcador=${product.id} onclick="anyadirProductoAlCarrito()" >Agregar</button>
            </div>
          </div>
        </div>
        `;
        items.push(obj);
    });
    containerProductos.innerHTML = products;
    DOMconteoProductos.innerHTML = contadorProductos;
        addCart();

};

 const renderizarProductos=() =>{
    baseDeDatos.forEach((info) => {
        const nodoCol = document.createElement('div');
        nodoCol.classList.add('col');
        const miNodo = document.createElement('div');
        miNodo.classList.add('card');
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title', 'align-content-center');
        miNodoTitle.textContent = info.nombre;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'Agregar';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        nodoCol.appendChild(miNodo);
        DOMitems.appendChild(nodoCol);
    });
DOMconteoProductos.innerHTML = contadorProductos;
 };

function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'));
    contadorProductos++;
    renderizarCarrito();

}

function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'btn-sm','mx-5');
        miBoton.textContent = 'Eliminar';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMconteoProductos.innerHTML = contadorProductos;
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    contadorProductos--;
    renderizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    contadorProductos = 0;
    renderizarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

renderizarProductos();
renderizarCarrito();
printProducto();

