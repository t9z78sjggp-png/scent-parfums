/* ==========================
   SCENT PARFUMS
   SCRIPT.JS - PARTE 1
========================== */

let productos = [];
let carrito = [];

let categoriaActual = "Todos";

const contenedor = document.getElementById("productos");
const buscador = document.getElementById("buscar");
const marca = document.getElementById("marca");

async function iniciar() {

    await cargarProductos();

    cargarMarcas();

    renderizar();

}

async function cargarProductos() {

    const respuesta = await fetch("productos.json");

    productos = await respuesta.json();

}

function cargarMarcas() {

    const marcas = [...new Set(productos.map(p => p.marca))];

    marcas.sort();

    marcas.forEach(m => {

        const option = document.createElement("option");

        option.value = m;

        option.textContent = m;

        marca.appendChild(option);

    });

}

function renderizar() {

    let lista = [...productos];

    if (categoriaActual !== "Todos") {

        lista = lista.filter(p =>
            p.categoria.toLowerCase() === categoriaActual.toLowerCase()
        );

    }

    if (marca.value !== "") {

        lista = lista.filter(p => p.marca === marca.value);

    }

    if (buscador.value !== "") {

        lista = lista.filter(p =>
            p.nombre.toLowerCase().includes(
                buscador.value.toLowerCase()
            )
        );

    }

    document.getElementById("contadorProductos").textContent =
        lista.length + " perfumes";

    contenedor.innerHTML = "";

    lista.forEach(cr
    
    earCard);

}

function crearCard(producto){

    const card=document.createElement("div");

    card.className="card";

    let imagen="";

    if(producto.imagen===""){

        imagen=`
        <div class="placeholder">

            Imagen pendiente

        </div>
        `;

    }else{

        imagen=`

        <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            loading="lazy">

        `;

    }

    card.innerHTML=`

        ${imagen}

        <div class="info">

            <div class="nombre">

                ${producto.nombre}

            </div>

            <div class="marca">

                ${producto.marca}

            </div>

            <div class="stock">

                Consultar stock

            </div>

        </div>

    `;

    const boton=document.createElement("button");

    boton.textContent="Agregar al carrito";

    boton.onclick=()=>agregarCarrito(producto);

    card.appendChild(boton);

    contenedor.appendChild(card);

}

function agregarCarrito(producto){

    const existe=carrito.find(p=>p.id===producto.id);

    if(!existe){

        carrito.push(producto);

    }

    actualizarCarrito();

}

function actualizarCarrito(){

    document.getElementById("cantidadProductos").textContent=

        carrito.length+" perfumes agregados";

}

document.getElementById("consultarPedido").onclick=()=>{

    if(carrito.length===0){

        alert("Agregá al menos un perfume al carrito.");

        return;

    }

    let mensaje="Hola Scent Parfums.%0A%0A";

    mensaje+="Quisiera consultar disponibilidad de:%0A%0A";

    carrito.forEach(producto=>{

        mensaje+="• "+producto.nombre+"%0A";

    });

    mensaje+="%0AMuchísimas gracias.";

    window.open(

        "https://wa.me/5493537572296?text="+mensaje,

        "_blank"

    );

};

buscador.addEventListener("input",renderizar);

marca.addEventListener("change",renderizar);

document.querySelectorAll(".tab").forEach(tab=>{

    tab.addEventListener("click",()=>{

        document.querySelectorAll(".tab").forEach(t=>

            t.classList.remove("active")

        );

        tab.classList.add("active");

        categoriaActual=tab.dataset.tab;

        renderizar();

    });

});

iniciar();