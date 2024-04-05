/**
 * @file columnas.jsx
 * @version 1.0.0
 * @description Columnas de la tabla de seguimientos.
 * @author Componente Sistemas Ases.
 * @contact sistemas.ases@correounivalle.edu.co.
 * @date 13 de febrero del 2024
 */

/**
 * Arreglo que define las columnas de la tabla de seguimientos.
 * Cada objeto en el arreglo representa una columna y contiene la configuración necesaria.
 * @type {Array<Object>}
 */

export const Columnas = [
    {
        Header: 'Codigo',
        accessor: 'id'
    },
    {
        Header: 'Cedula',        
        accessor: 'phone'
    },
    {
        Header: 'Nombre',
        accessor: 'first_name'
    },    
    {
        Header: 'Apellido',        
        accessor: 'last_name'
    },    
    {
        Header: 'Cantidad fichas',        
        accessor: 'age'
    },
    {
        Header: 'Cantidad inasistencias',        
        accessor: 'age2'
    },
    {
        Header: 'Total de fichas',        
        accessor: 'age3'
    },
    {
        Header: 'Monitor',        
        accessor: 'country'
    },
    {
        Header: 'Practicante',        
        accessor: 'country2'
    },
    {
        Header: 'Profesional',        
        accessor: 'phone2'
    }
    
]

export default Columnas 