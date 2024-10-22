// Función para obtener la fecha actual y actualizar el estado de la variable today
export const currentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Meses de 1 a 12
    const day = String(currentDate.getDate()).padStart(2, '0'); // Día del mes
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};