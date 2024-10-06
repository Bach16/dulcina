
export const obtenerFechaActual=()=> {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio", 
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    return `${mes} ${dia}, ${año}`;
}

export const obtenerAño=()=> {

    const fecha = new Date();
    const año = fecha.getFullYear();

    return `${año}`;
}