import {uri} from "@lib/config";


interface Options {
    token?: string
}

//Obtendremos todas las pantallas de la bd que no esten al dia con sus pagos
const fetchNonPayments = async ({token}:Options)=>{
    //Nuevo objeto URL que nos permite manejar la url como un objeto
    const url = new URL(`${uri}/payment_status`)


    const res = await fetch(url,{
        headers: {
            'Content-Type': 'application/json',
            //Envío de user token
            'Authorization': `Bearer ${token}`
        },
    })
    
    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('No tienes permisos para ejecutar esta solicitud.');
        }else if(res.status === 500) {
            throw new Error('Error de servidor. Intentalo de nuevo más tarde.');
        } else{
            throw new Error('Hubo un error. Intentalo de nuevo más tarde.');
        }
    }

    const data = await res.json()

    return data
}

//Export service
export const paymentsService = {
    fetchNonPayments
}