let carritoArray = JSON.parse(localStorage.getItem("experiencias")) || [];

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
let carritoVacio = document.querySelector(".carritoVacio");
let carritoLleno = document.querySelector(".carritoLleno");
let totalCompra = document.querySelector("#totalCompra");
let resumen = document.querySelector(".resumen");
let cuotaUno = document.querySelector(".uno");
let cuotaTres = document.querySelector(".tres");
let cuotaSeis = document.querySelector(".seis");
let cuotaDebito = document.querySelector(".debito");
let valorFinal = document.querySelector("#valorFinal");
let pagoFinal = document.querySelector(".pagoFinal");
let ordenDeCompra = document.querySelector(".ordenDeCompra");
let final = document.querySelector(".final");
let valorCuota
let totalFinal
let orden = (Math.round(Math.random() * 10000))



regalos.forEach((experiencia) => {
    let div = document.createElement("div");
    div.classList.add("regalos");
    div.innerHTML =
        `<img class="imagenRegalo" src="${experiencia.imagen}">
        <h2>${experiencia.nombre}</h2>
        <h3><i class="bi bi-cash"></i> $${experiencia.valor} x 1 persona</h3>
        <p>${experiencia.descripcion}</p>
        <h4><i class="bi bi-geo-alt-fill"></i> ${experiencia.direccion}</h4>
        <h4><i class="bi bi-telephone-fill"></i> ${experiencia.telefono}</h4>`;

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

cuotaUno.addEventListener("click", function () {
    valorCuota = totalFinal / 1;
    Swal.fire({
        title: "¿Desea finalizar la compra?",
        text: `El total es de $${totalFinal}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#b8c394",
        cancelButtonColor: "#6b1c27",
        confirmButtonText: "Continuar",
        color: "#1f7387",
        allowOutsideClick: "true",
        background: "#ececece0",
        iconColor: "#871f47",
        denyButton: "#871f47",
    }).then((result) => {
        if (result.isConfirmed) {
            let cupon = document.createElement("div");
            cupon.classList.add("orden");
            cupon.innerHTML =
                `<i class="bi bi-ticket-perforated-fill"></i> <h2>Su cupón de compra es el ${orden}</h2>
                <h3>Gracias por utilizar WeGift, Lo esperamos pronto!</h3><i class="bi bi-suit-heart-fill"></i>
        `;
            ordenDeCompra.append(cupon);
            Swal.fire({
                title: "Pago Realizado!",
                text: `Usted realizó el pago en 1 cuota de: $${valorCuota.toFixed(2)}`,
                iconHtml: '<i class="bi-check"></i>',
                confirmButtonText: "Continuar",
                color: "#1f7387",
                allowOutsideClick: "true",
                background: "#ececece0",
                iconColor: "#871f47",
                confirmButtonColor:"#b8c394"
            });
            Toastify({
                text: "Se ha generado un nuevo cupón",
                duration: 1500,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #871f47, #be4b77)",
                },
            }).showToast();
            ordenDeCompra.classList.remove("visto");
        }
    });
});

cuotaTres.addEventListener("click", function () {
    valorCuota = totalFinal / 3;
    Swal.fire({
        title: "¿Desea finalizar la compra?",
        text: `El total es de $${totalFinal}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#b8c394",
        cancelButtonColor: "#6b1c27",
        confirmButtonText: "Continuar",
        color: "#1f7387",
        allowOutsideClick: "true",
        background: "#ececece0",
        iconColor: "#871f47",
    }).then((result) => {
        if (result.isConfirmed) {
            let cupon = document.createElement("div");
            cupon.classList.add("orden");
            cupon.innerHTML =
                `<i class="bi bi-ticket-perforated-fill"></i><h2> Su cupón de compra es el ${orden}</h2>
                <h3>Gracias por utilizar WeGift, Lo esperamos pronto!</h3><i class="bi bi-suit-heart-fill"></i>
        `;
            ordenDeCompra.append(cupon);
            Swal.fire({
                title: "Pago Realizado!",
                text: `Usted realizó el pago en 3 cuotas de: $${valorCuota.toFixed(2)}`,
                iconHtml: '<i class="bi-check"></i>',
                confirmButtonText: "Continuar",
                color: "#1f7387",
                allowOutsideClick: "true",
                background: "#ececece0",
                iconColor: "#871f47",
                confirmButtonColor:"#b8c394"
            });
            Toastify({
                text: "Se ha generado un nuevo cupón",
                duration: 1500,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #871f47, #be4b77)",
                },
            }).showToast();
            ordenDeCompra.classList.remove("visto");
        }
    });
});

cuotaSeis.addEventListener("click", function () {
    valorCuota = totalFinal / 6;
    Swal.fire({
        title: "¿Desea finalizar la compra?",
        text: `El total es de $${totalFinal}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#b8c394",
        cancelButtonColor: "#6b1c27",
        confirmButtonText: "Continuar",
        color: "#1f7387",
        allowOutsideClick: "true",
        background: "#ececece0",
        iconColor: "#871f47",
    }).then((result) => {
        if (result.isConfirmed) {
            let cupon = document.createElement("div");
            cupon.classList.add("orden");
            cupon.innerHTML =
                `<i class="bi bi-ticket-perforated-fill"></i><h2> Su cupón de compra es el ${orden}</h2>
                <h3>Gracias por utilizar WeGift, Lo esperamos pronto!</h3><i class="bi bi-suit-heart-fill"></i>
        `;
            ordenDeCompra.append(cupon);
            Swal.fire({
                title: "Pago Realizado!",
                text: `Usted realizó el pago en 6 cuotas de: $${valorCuota.toFixed(2)}`,
                iconHtml: '<i class="bi-check"></i>',
                confirmButtonText: "Continuar",
                color: "#1f7387",
                allowOutsideClick: "true",
                background: "#ececece0",
                iconColor: "#871f47",
                confirmButtonColor:"#b8c394"
            });
            Toastify({
                text: "Se ha generado un nuevo cupón",
                duration: 1500,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #871f47, #be4b77)",
                },
            }).showToast();
            ordenDeCompra.classList.remove("visto");
        }
    });
});
cuotaDebito.addEventListener("click", function () {
    valorCuota = totalFinal / 1;
    Swal.fire({
        title: "¿Desea finalizar la compra?",
        text: `El total es de $${totalFinal}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#b8c394",
        cancelButtonColor: "#6b1c27",
        confirmButtonText: "Continuar",
        color: "#1f7387",
        allowOutsideClick: "true",
        background: "#ececece0",
        iconColor: "#871f47",
    }).then((result) => {
        if (result.isConfirmed) {
            let cupon = document.createElement("div");
            cupon.classList.add("orden");
            cupon.innerHTML =
                `<i class="bi bi-ticket-perforated-fill"></i><h2> Su cupón de compra es el ${orden}</h2>
                <h3>Gracias por utilizar WeGift, Lo esperamos pronto!</h3><i class="bi bi-suit-heart-fill"></i>
        `;
            ordenDeCompra.append(cupon);
            Swal.fire({
                title: "Pago Realizado!",
                text: `Usted realizó el pago con tarjeta de debito por un total de: $${valorCuota.toFixed(2)}`,
                iconHtml: '<i class="bi-check"></i>',
                confirmButtonText: "Continuar",
                color: "#1f7387",
                allowOutsideClick: "true",
                background: "#ececece0",
                iconColor: "#871f47",
                confirmButtonColor:"#b8c394"
            });
            Toastify({
                text: "Se ha generado un nuevo cupón",
                duration: 1500,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #871f47, #be4b77)",
                },
            }).showToast();
            ordenDeCompra.classList.remove("visto");
        }
    });
});

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
        button.innerText = `Formas de pago`;
        button.addEventListener("click", () => {
            pagoFinal.classList.remove("visto");
        });
        final.append(button);
    }
}

function cuotas() {
    if (carritoArray.length === 0) {
        resumen.classList.add("visto");
    } else {
        resumen.classList.remove("visto");
    }
}



function verCarrito() {
    if (carritoArray.length === 0) {
        carritoLleno.classList.add("visto");
        carritoVacio.classList.remove("visto");
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
    finalizarCompra();
    localStorage.setItem("experiencias", JSON.stringify(carritoArray));
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

verCarrito();