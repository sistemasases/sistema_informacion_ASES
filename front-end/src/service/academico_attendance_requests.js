const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function postData(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}/academico/monitorias_academicas/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
}