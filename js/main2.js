let regalos = [{
    nombre: 'Cena en Rooftop en Pto Madero',
    valor: 40000,
    descripcion: 'La opción perfecta para cortar la semana. Mediodías y noches con sabores que son una obra de arte',
    direccion: 'Av. Elvira Rawson de Dellepiane 150',
    telefono: ' 11 5579-9007',
    imagen: './img/rooftop.jpg',
    cantidadPersona: 1,
},
{
    nombre: 'Merienda en Palacio Duhau de 15hs a 18hs',
    valor: 15000,
    descripcion: 'Exploren nuevos y audaces sabores de la mano del talentoso equipo de pastelería del Palacio.',
    direccion: 'Av. Alvear 1661',
    telefono: ' 11 5171-1234',
    imagen: './img/duhau.jpg',
    cantidadPersona: 1,
},
{
    nombre: 'Almuerzo dentro del Hotel Hilton en el Faro Restaurant',
    valor: 30000,
    descripcion: 'Platitos al centro de temporada para compartir bajo la propuesta del chef Maxi Rossi.',
    direccion: 'Blvd. Macacha Guemes 351',
    telefono: ' 11 4891-0000',
    imagen: "./img/hilton.jpg",
    cantidadPersona: 1,
},
{
    nombre: 'Cena en The Nook',
    valor: 18000,
    direccion: 'Av. Corrientes 802',
    descripcion: 'Un resto-bar bohemio y chic, con una fusión de comida casera y clásicos del fast food.',
    telefono: ' 11 5946-7865',
    imagen: "./img/thenox.jpg",
    cantidadPersona: 1,
}]

let eleccionExperiencias = document.querySelector("#experiencia");
let carritoVacio = document.querySelector("#carritoVacio");
let carritoLleno = document.querySelector("#carritoLleno");
let totalCompra = document.querySelector("#totalCompra");
let resumen = document.querySelector(".resumen");
let cuotaUno = document.querySelector(".uno");
let cuotaTres = document.querySelector(".tres");
let cuotaSeis = document.querySelector(".seis");
let cuotaDebito = document.querySelector(".debito");
let valorFinal = document.querySelector("#valorFinal");
let pagoFinal = document.querySelector(".pagoFinal");
let final = document.querySelector(".final");
let valorCuota
let totalFinal

let carritoArray = [];

regalos.forEach((experiencia) => {
    let div = document.createElement("div");
    div.classList.add("regalos");
    div.innerHTML =
        `<img class="imagenRegalo" src="${experiencia.imagen}">
        <h2>${experiencia.nombre}</h2>
        <h3>$${experiencia.valor} 1 persona</h3>
        <p>${experiencia.descripcion}</p>
        <h4>${experiencia.direccion}</h4>
        <h4>${experiencia.telefono}</h4>`;

    let boton = document.createElement("button");
    boton.classList.add("boton");
    boton.innerText = "Agregar por persona";
    boton.addEventListener("click", () => {
        comprasRealizadas(experiencia);
        cuotas();
    });

    div.append(boton);
    eleccionExperiencias.prepend(div);
});

function cuotas() {
    if (carritoArray.length === 0) {
        resumen.classList.add("visto");
    } else {
        resumen.classList.remove("visto")

        cuotaUno.addEventListener("click", function () {
            valorCuota = totalFinal / 1;
            valorFinal.innerText = `Usted realizo el pago en 1 cuota de: $${valorCuota.toFixed(2)}`
        });

        cuotaTres.addEventListener("click", function () {
            valorCuota = totalFinal / 3;
            valorFinal.innerText = `Usted realizo el pago en 3 cuotas de: $${valorCuota.toFixed(2)} cada una`
        });

        cuotaSeis.addEventListener("click", function () {
            valorCuota = totalFinal / 6;
            valorFinal.innerText = `Usted realizo el pago en 6 cuotas de: $${valorCuota.toFixed(2)} cada una`
        });

        cuotaDebito.addEventListener("click", function () {
            valorCuota = totalFinal / 1;
            valorFinal.innerText = `Usted realizo el pago en debito el total es de $${valorCuota.toFixed(2)}`
        });
    }
}

function finalizarCompra() {
    if (carritoArray.length === 0) {
        pagoFinal.classList.add("visto");        
    } else {
        const existingButton = final.querySelector(".finalizar");
        if (existingButton) {
            existingButton.remove();
        }
        let button = document.createElement("button");
        button.classList.add("finalizar");
        button.innerText = `Finalizar compra`; 
        button.addEventListener("click", () => {
            pagoFinal.classList.remove("visto");
        });
        final.append(button);
    }
}

function verCarrito() {
    if (carritoArray.length === 0) {
        carritoVacio.classList.remove("visto");
        carritoLleno.classList.add("visto")
    }
    else {
        carritoLleno.classList.remove("visto");
        carritoVacio.classList.add("visto");

        carritoLleno.innerHTML = "";
        carritoArray.forEach((carrito) => {
            let div = document.createElement("div");
            div.classList.add("CarritoLleno");
            div.innerHTML =
                `<h2>${carrito.nombre}</h2>
            <p>Cant Personas: ${carrito.cantidadPersona}</p>
            <p>Valor Final:${carrito.valor * carrito.cantidadPersona}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("quitar");
            button.innerText = `QUITAR`;
            button.addEventListener("click", () => {
                quitarCarrito(carritoArray)
            })
            div.append(button);
            carritoLleno.append(div);
        })
    }
    total();
    cuotas();
    finalizarCompra();
}

function comprasRealizadas(experiencia) {
    let expEncontrada = carritoArray.find((item) => item.nombre === experiencia.nombre);
    if (expEncontrada) {
        expEncontrada.cantidadPersona++;
    } else {
        carritoArray.push({ ...experiencia, cantidadPersona: 1 });
    }
    console.log(carritoArray);
    verCarrito();
    cuotas();
    finalizarCompra();
}

function quitarCarrito(carrito) {
    let indice = carritoArray.findIndex((producto) => producto.nombre === carrito.nombre);
    carritoArray.splice(indice, 1);
    verCarrito();
    cuotas();
    finalizarCompra();
}

function total() {
    totalFinal = carritoArray.reduce((acc, regalos) => acc + (regalos.valor * regalos.cantidadPersona), 0);
    totalCompra.innerText = `$${totalFinal}`;
}

