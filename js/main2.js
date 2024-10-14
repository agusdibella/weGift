let carritoArray = JSON.parse(localStorage.getItem("experiencias")) || [];

fetch("../js/exp.json")
    .then(response => response.json())
    .then(regalos => {
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
    })

let eleccionExperiencias = document.querySelector("#experiencia");
let carrito = document.querySelector(".carrito");
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

function verCarrito() {
    if (carritoArray.length === 0) {
        carritoLleno.classList.add("visto");
        carritoVacio.classList.remove("visto");
    }
    else {
        carritoLleno.classList.remove("visto");
        carritoVacio.classList.add("visto");

        carritoLleno.innerHTML = "";
        let vaciar = document.createElement("button");
        vaciar.classList.add("vaciar");
        vaciar.innerText = `Vaciar carrito`;
        vaciar.addEventListener("click", () => {
            carritoArray = [];
            verCarrito();
            cuotas();
            finalizarCompra();
            localStorage.setItem("experiencias", JSON.stringify(carritoArray));
            ordenDeCompra.innerHTML = "";
        });

        carritoArray.forEach((carrito) => {
            let div = document.createElement("div");
            div.classList.add("CarritoLleno");
            div.innerHTML =
                `<h2>${carrito.nombre}</h2>
                <p>Cant Personas: ${carrito.cantidadPersona}</p>
                <p>Valor Final: $${carrito.valor * carrito.cantidadPersona}</p>`;

            let button = document.createElement("button");
            button.classList.add("quitar");
            button.innerText = `QUITAR`;
            button.addEventListener("click", () => {
                quitarCarrito(carrito);
            });
            div.append(button);
            carritoLleno.append(div);
        });

        carritoLleno.append(vaciar);
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

ordenDeCompra.innerHTML = ""
let nuevoOrden = Math.round(Math.random() * 10000);
let cupon = document.createElement("div");
cupon.classList.add("orden");
cupon.innerHTML =
    `<i class="bi bi-ticket-perforated-fill"></i> 
    <h2>Su cupón de compra es el ${nuevoOrden}</h2>
    <h3>Gracias por utilizar WeGift, ¡lo esperamos pronto!</h3>
    <i class="bi bi-suit-heart-fill"></i>`;
ordenDeCompra.append(cupon);


function quitarCarrito(carrito) {
    let indice = carritoArray.findIndex((producto) => producto.nombre === carrito.nombre);
    carritoArray.splice(indice, 1);
    verCarrito();
    cuotas();
    finalizarCompra();
    if (carritoArray.length === 0) {
        ordenDeCompra.innerHTML = "";
    }
}

function finalizarCompra() {
    const existingButton = final.querySelector(".finalizar");
    pagoFinal.classList.add("visto");

    if (carritoArray.length === 0) {
        if (existingButton) {
            existingButton.remove();
        }

        ordenDeCompra.innerHTML = "";
    } else {
        if (existingButton) {
            existingButton.remove();
        }

        let button = document.createElement("button");
        button.classList.add("finalizar");
        button.innerText = `Formas de pago`;
        button.addEventListener("click", () => {
            pagoFinal.classList.remove("visto");
            cuotas();
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
    }).then((result) => {
        if (result.isConfirmed) {
            let cupon = document.createElement("div");
            cupon.classList.add("orden");
            cupon.innerHTML =
                `<i class="bi bi-ticket-perforated-fill"></i> 
                <h2>Su cupón de compra es el ${orden}</h2>
                <h3>Gracias por utilizar WeGift, ¡lo esperamos pronto!</h3>
                <i class="bi bi-suit-heart-fill"></i>`;
            ordenDeCompra.append(cupon);
            pagoFinal.classList.add("visto");

            let nuevoCarrito = document.createElement("button");
            nuevoCarrito.classList.add("nuevaCompra");
            nuevoCarrito.innerText = "¡Desea realizar una nueva compra?";
            nuevoCarrito.addEventListener("click", () => {
                carritoArray = [];
                verCarrito();
                cuotas();
                finalizarCompra();
                localStorage.setItem("experiencias", JSON.stringify(carritoArray));
                ordenDeCompra.innerHTML = "";
            });


            ordenDeCompra.append(nuevoCarrito);

            Swal.fire({
                title: "Pago Realizado!",
                text: `Usted realizó el pago en 1 cuota de: $${valorCuota.toFixed(2)}`,
                iconHtml: '<i class="bi-check"></i>',
                confirmButtonText: "Continuar",
                color: "#1f7387",
                allowOutsideClick: "true",
                background: "#ececece0",
                iconColor: "#871f47",
                confirmButtonColor: "#b8c394"
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
                `<i class="bi bi-ticket-perforated-fill"></i> 
                <h2>Su cupón de compra es el ${orden}</h2>
                <h3>Gracias por utilizar WeGift, ¡lo esperamos pronto!</h3>
                <i class="bi bi-suit-heart-fill"></i>`;
            ordenDeCompra.append(cupon);
            pagoFinal.classList.add("visto");

            let nuevoCarrito = document.createElement("button");
            nuevoCarrito.classList.add("nuevaCompra");
            nuevoCarrito.innerText = "¡Desea realizar una nueva compra?";
            nuevoCarrito.addEventListener("click", () => {
                carritoArray = [];
                verCarrito();
                cuotas();
                finalizarCompra();
                localStorage.setItem("experiencias", JSON.stringify(carritoArray));
                ordenDeCompra.innerHTML = "";
            });
            ordenDeCompra.append(nuevoCarrito);
            Swal.fire({
                title: "Pago Realizado!",
                text: `Usted realizó el pago en 3 cuotas de: $${valorCuota.toFixed(2)}`,
                iconHtml: '<i class="bi-check"></i>',
                confirmButtonText: "Continuar",
                color: "#1f7387",
                allowOutsideClick: "true",
                background: "#ececece0",
                iconColor: "#871f47",
                confirmButtonColor: "#b8c394"
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

                `<i class="bi bi-ticket-perforated-fill"></i> 
                <h2>Su cupón de compra es el ${orden}</h2>
                <h3>Gracias por utilizar WeGift, ¡lo esperamos pronto!</h3>
                <i class="bi bi-suit-heart-fill"></i>`;
            ordenDeCompra.append(cupon);
            pagoFinal.classList.add("visto");

            let nuevoCarrito = document.createElement("button");
            nuevoCarrito.classList.add("nuevaCompra");
            nuevoCarrito.innerText = "¡Desea realizar una nueva compra?";
            nuevoCarrito.addEventListener("click", () => {
                carritoArray = [];
                verCarrito();
                cuotas();
                finalizarCompra();
                localStorage.setItem("experiencias", JSON.stringify(carritoArray));
                ordenDeCompra.innerHTML = "";
            });
            ordenDeCompra.append(nuevoCarrito);

            Swal.fire({
                title: "Pago Realizado!",
                text: `Usted realizó el pago en 6 cuotas de: $${valorCuota.toFixed(2)}`,
                iconHtml: '<i class="bi-check"></i>',
                confirmButtonText: "Continuar",
                color: "#1f7387",
                allowOutsideClick: "true",
                background: "#ececece0",
                iconColor: "#871f47",
                confirmButtonColor: "#b8c394"
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
                `<i class="bi bi-ticket-perforated-fill"></i> 
                <h2>Su cupón de compra es el ${orden}</h2>
                <h3>Gracias por utilizar WeGift, ¡lo esperamos pronto!</h3>
                <i class="bi bi-suit-heart-fill"></i>`;
            ordenDeCompra.append(cupon);
            pagoFinal.classList.add("visto");

            let nuevoCarrito = document.createElement("button");
            nuevoCarrito.classList.add("nuevaCompra");
            nuevoCarrito.innerText = "¡Desea realizar una nueva compra?";
            nuevoCarrito.addEventListener("click", () => {
                carritoArray = [];
                verCarrito();
                cuotas();
                finalizarCompra();
                localStorage.setItem("experiencias", JSON.stringify(carritoArray));
                ordenDeCompra.innerHTML = "";
            });
            ordenDeCompra.append(nuevoCarrito);
            Swal.fire({
                title: "Pago Realizado!",
                text: `Usted realizó el pago con debito el valor total es de $${valorCuota.toFixed(2)}`,
                iconHtml: '<i class="bi-check"></i>',
                confirmButtonText: "Continuar",
                color: "#1f7387",
                allowOutsideClick: "true",
                background: "#ececece0",
                iconColor: "#871f47",
                confirmButtonColor: "#b8c394"
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


function total() {
    totalFinal = carritoArray.reduce((acc, regalos) => acc + (regalos.valor * regalos.cantidadPersona), 0);
    totalCompra.innerText = `$${totalFinal}`;
}

verCarrito();