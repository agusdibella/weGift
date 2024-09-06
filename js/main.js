let experienciaUno = ['Cena en Rooftop en Pto Madero', 40000, 'Av. Elvira Rawson de Dellepiane 150', '011 5579-9007']
let experienciaDos = ['Merienda en Palacio Duhau de 15hs a 18hs', 15000, 'Av. Alvear 1661', '011 5171-1234']
let experienciaTres = ['Almuerzo dentro del Hotel Hilton en el Faro Restaurant', 30000, 'Blvd. Macacha Guemes 351', '011 4891-0000']

let cupon = (Math.round(Math.random() * 10000));

let usuario = new Object();
usuario.nombre = prompt("Ingrese su nombre por favor");
usuario.apellido = prompt("Ingrese su apellido");
usuario.dni = prompt("Ingrese su DNI")

let precioPorPersona
let elegirExperiencia;
let final
let comprasRealizadas = []

function precioTotalExperiencia(valor, cantPersonas) {
    return valor * cantPersonas;
}
function valorTotal(valorTotalExperiencia, cuotas) {
    return valorTotalExperiencia / cuotas;
}

function WeGift() {
    do {
        elegirExperiencia = prompt('Bienvenido ' + usuario.nombre + ' a WeGift, ¿qué experiencia desea disfrutar? \n 1) ' + experienciaUno[0] + ' a $' + experienciaUno[1] +'por persona \n 2) ' + experienciaDos[0] + ' a $' + experienciaDos[1] +'por persona \n 3) ' + experienciaTres[0] + ' a $' + experienciaTres[1] +'por persona \n \nIngrese el número de la opción deseada');
        switch (elegirExperiencia) {
            case '1':
                precioPorPersona = experienciaUno[1];
                break;
            case '2':
                precioPorPersona = experienciaDos[1];
                break;
            case '3':
                precioPorPersona = experienciaTres[1];
                break;
            default:
                alert('Por favor, ingrese una opción válida (1, 2 o 3).');
                elegirExperiencia = null;
                break;
        }
    } while (elegirExperiencia !== '1' && elegirExperiencia !== '2' && elegirExperiencia !== '3' && elegirExperiencia !== '4');

    let cantPersonas;

do {
    cantPersonas = parseInt(prompt('Elige cuántas personas van a disfrutar de la experiencia'));
    if (isNaN(cantPersonas) || cantPersonas == undefined || cantPersonas =="") {
        alert("Por favor, ingresa un número válido.");
    }
} while (isNaN(cantPersonas) || cantPersonas == undefined || cantPersonas =="");

    let valorTotalExperiencia = precioTotalExperiencia(precioPorPersona, cantPersonas);
    let opcionCuotas
    let cuota

    do {
        opcionCuotas = parseInt(prompt('La compra se puede realizar en 1, 3 y 6 cuotas sin interés.\nIngrese en cuántas cuotas desea realizar la compra'));
        if (opcionCuotas === 1 || opcionCuotas === 3 || opcionCuotas === 6) {
            cuota = valorTotal(valorTotalExperiencia, opcionCuotas);
        } else {
            alert('Ingrese una opción válida');
        }
    } while (opcionCuotas !== 1 && opcionCuotas !== 3 && opcionCuotas !== 6);

    if (elegirExperiencia === '1') {
        final = (`Felicidades! Usted compro ${experienciaUno[0]} \nDirección: ${experienciaUno[2]} \nPara coordinar el uso del cupon comuniquese a : ${experienciaUno[3]} \n \nSu cupon es el ${cupon} a nombre de ${usuario.nombre} ${usuario.apellido} bajo el DNI ${usuario.dni} el Valor total de la Experiencia es de $${valorTotalExperiencia}', lo abonaras en ${opcionCuotas} cuotas de $${cuota}`);
    } else if (elegirExperiencia === '2') {
        final = (`Felicidades! Usted compro ${experienciaDos[0]} \nDirección: ${experienciaDos[2]} \nPara coordinar el uso del cupon comuniquese a : ${experienciaDos[3]} \n \nSu cupon es el ${cupon} a nombre de ${usuario.nombre} ${usuario.apellido} bajo el DNI ${usuario.dni} el Valor total de la Experiencia es de $${valorTotalExperiencia}', lo abonaras en ${opcionCuotas} cuotas de $${cuota}`);
    }
    else if (elegirExperiencia === '3') {
        final = (`Felicidades! Usted compro ${experienciaTres[0]} \nDirección: ${experienciaTres[2]} \nPara coordinar el uso del cupon comuniquese a : ${experienciaTres[3]} \n \nSu cupon es el ${cupon} a nombre de ${usuario.nombre} ${usuario.apellido} bajo el DNI ${usuario.dni} el Valor total de la Experiencia es de $${valorTotalExperiencia}', lo abonaras en ${opcionCuotas} cuotas de $${cuota}`);
    }
    comprasRealizadas.push(final);
    alert(final);
}


do {
    WeGift();
saludoFinal = confirm("Desea realizar otra compra?")
} while (saludoFinal)
alert("Gracias, lo esperamos pronto!")

console.log('Sus compras realizadas:' ,comprasRealizadas)



