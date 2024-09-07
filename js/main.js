let experiencia =[{
    nombre: 'Cena en Rooftop en Pto Madero',
    valor: 40000,
    direccion: 'Av. Elvira Rawson de Dellepiane 150',
    telefono: '011 5579-9007'
},
{
    nombre:'Merienda en Palacio Duhau de 15hs a 18hs',
    valor:15000,
    direccion:'Av. Alvear 1661',
    telefono:'011 5171-1234'
    },
{
    nombre:'Almuerzo dentro del Hotel Hilton en el Faro Restaurant',
    valor:30000,
    direccion:'Blvd. Macacha Guemes 351',
    telefono:'011 4891-0000'
}]

let usuario = new Object();
usuario.nombre = prompt("Ingrese su nombre por favor");
usuario.apellido = prompt("Ingrese su apellido");
usuario.dni = prompt("Ingrese su DNI")

let precioPorPersona
let elegirExperiencia;
let final
let comprasRealizadas = []
let gastoTotal = [];

function precioTotalExperiencia(valor, cantPersonas) {
    return valor * cantPersonas;
}
function valorTotal(valorTotalExperiencia, cuotas) {
    return valorTotalExperiencia / cuotas;
}

function WeGift() {

let cupon = (Math.round(Math.random() * 10000));
    do {
        elegirExperiencia = prompt('Bienvenido ' + usuario.nombre + ' a WeGift, ¿qué experiencia desea disfrutar? \n 1) ' + experiencia[0].nombre+ ' a $' + experiencia[0].valor + 'por persona \n 2) ' + experiencia[1].nombre + ' a $' + experiencia[1].valor + 'por persona \n 3) ' + experiencia[2].nombre + ' a $' + experiencia[2].valor + 'por persona \n \nIngrese el número de la opción deseada');
        switch (elegirExperiencia) {
            case '1':
                precioPorPersona = experiencia[0].valor ;
                break;
            case '2':
                precioPorPersona = experiencia[1].valor;
                break;
            case '3':
                precioPorPersona = experiencia[2].valor;
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
        if (isNaN(cantPersonas) || cantPersonas == undefined || cantPersonas == "") {
            alert("Por favor, ingresa un número válido.");
        }
    } while (isNaN(cantPersonas) || cantPersonas == undefined || cantPersonas == "");

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
        final = (`Felicidades! Usted compro ${experiencia[0].nombre} \nDirección: ${experiencia[0].direccion} \nPara coordinar el uso del cupon comuniquese a : ${experiencia[0].telefono} \n \nSu cupon es el ${cupon} a nombre de ${usuario.nombre} ${usuario.apellido} bajo el DNI ${usuario.dni} el Valor total de la Experiencia es de $${valorTotalExperiencia}', lo abonaras en ${opcionCuotas} cuotas de $${cuota}`);
    } else if (elegirExperiencia === '2') {
        final = (`Felicidades! Usted compro ${experiencia[1].nombre} \nDirección: ${experiencia[1].direccion} \nPara coordinar el uso del cupon comuniquese a : ${experiencia[1].telefono} \n \nSu cupon es el ${cupon} a nombre de ${usuario.nombre} ${usuario.apellido} bajo el DNI ${usuario.dni} el Valor total de la Experiencia es de $${valorTotalExperiencia}', lo abonaras en ${opcionCuotas} cuotas de $${cuota}`);
    }
    else if (elegirExperiencia === '3') {
        final = (`Felicidades! Usted compro ${experiencia[2].nombre} \nDirección: ${experiencia[2].direccion} \nPara coordinar el uso del cupon comuniquese a : ${experiencia[2].telefono} \n \nSu cupon es el ${cupon} a nombre de ${usuario.nombre} ${usuario.apellido} bajo el DNI ${usuario.dni} el Valor total de la Experiencia es de $${valorTotalExperiencia}', lo abonaras en ${opcionCuotas} cuotas de $${cuota}`);
    }
    comprasRealizadas.push(final);
    gastoTotal.push(valorTotalExperiencia);
    alert(final);
}


do {
    WeGift();
    saludoFinal = confirm("Desea realizar otra compra?")
} while (saludoFinal)
alert("Gracias, lo esperamos pronto!")

console.log('Ustede realizó ' + comprasRealizadas.length + ' compras')
console.log("Sus compras realizadas fueron:") + comprasRealizadas.forEach(element =>{console.log(element)});
console.log('El total de su compra es de $' + gastoTotal.reduce((acc, gasto)=> acc+gasto,0));