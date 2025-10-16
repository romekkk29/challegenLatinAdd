import {QueryParams, Screen, ScreenListResponse} from '../types/screen'
import {uri} from "@lib/config";


interface Options {
    params: QueryParams,
    token?: string
}

//Obtendremos todas las pantallas de la bd
const fetchScreens = async ({params, token}:Options): Promise<ScreenListResponse>=>{
    //Nuevo objeto URL que nos permite manejar la url como un objeto
    const url = new URL(`${uri}/display`)
    //Agregamois los params provenientes de los argumentos de la función a url
    Object.entries(params).forEach(([key, value]) => {
        return url.searchParams.append(key, value)
    });

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

    const data:ScreenListResponse = await res.json()

    return data
}

//Obtendremos todas las pantallas de la bd
const fetchOneScreens = async ({id, token}:{id:number, token:string}): Promise<Screen>=>{
    const url = new URL(`${uri}/display/${id}`)

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

    const data:Screen = await res.json()

    return data
}

const createScreen = async (screen:Screen, token:string):Promise<Screen>=>{
    const {price_per_day, resolution_height, resolution_width} = screen

    //Parseamos los valores a enteros
    const pricePerDay = parseInt(price_per_day)
    const resolutionHeight = parseInt(resolution_height)
    const resolutionWidth = parseInt(resolution_width)


    //Realiazamos una llamada a nuestra api
    const res = await fetch(`${uri}/display`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //Envío de user token
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...screen,
            price_per_day: pricePerDay,
            resolution_height: resolutionHeight,
            resolution_width: resolutionWidth
        }),
    })

    //validamos que no hayan errores
    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('No tienes permisos para ejecutar esta solicitud.');
        }else if(res.status === 500) {
            throw new Error('Error de servidor. Intentalo de nuevo más tarde.');
        } else{
            throw new Error('Hubo un error. Intentalo de nuevo más tarde.');
        }
    }

    const data:Screen = await res.json()

    return data
}

const updateScreen = async (screen:Screen, token:string):Promise<Screen>=>{
    const id = screen.id
    const {price_per_day, resolution_height, resolution_width} = screen

    //Parseamos los valores a enteros
    const pricePerDay = parseInt(price_per_day)
    const resolutionHeight = parseInt(resolution_height)
    const resolutionWidth = parseInt(resolution_width)


    //Realiazamos una llamada a nuestra api
    const res = await fetch(`${uri}/display/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            //Envío de user token
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...screen,
            price_per_day: pricePerDay,
            resolution_height: resolutionHeight,
            resolution_width: resolutionWidth
        }),
    })

    //validamos que no hayan errores
    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('No tienes permisos para ejecutar esta solicitud.');
        }else if(res.status === 500) {
            throw new Error('Error de servidor. Intentalo de nuevo más tarde.');
        } else{
            throw new Error('Hubo un error. Intentalo de nuevo más tarde.');
        }
    }

    const data:Screen = await res.json()

    return data
}

//Controlador para eliminar una pantalla
const deleteScreen = async ({id, token}:{id:number, token:string}): Promise<Screen>=>{
    const url = new URL(`${uri}/display/${id}`)

    const res = await fetch(url,{
        method: 'DELETE',
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

    const data:Screen = await res.json()

    return data
}

//Export service
export const screenService = {
    fetchScreens,
    fetchOneScreens,
    createScreen,
    updateScreen,
    deleteScreen
}