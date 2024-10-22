/**
 * @file academico_attendance_requests.js
 * @version 1.0.0
 * @description Este archivo se encarga de realizar las peticiones al servidor para 
 *              obtener una lista de estudiantes que asistieron a las monitorías académicas.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 18 de octubre del 2024
*/

const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function postData(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}/academico/monitorias_academicas/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
}