import { AuthBody, UserResponse } from "types/user"
import {uri} from "@lib/config";

const login = async (body:AuthBody): Promise<UserResponse>=>{
    const res = await fetch(`${uri}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('El usuario o la contraseña son incorrectas. Intentalo de nuevo.');
        }else if(res.status === 500) {
            throw new Error('Error de servidor. Intentalo de nuevo más tarde.');
        } else{
            throw new Error('Hubo un error. Intentalo de nuevo más tarde.');
        }
    }
    const data:UserResponse = await res.json()

    return data
}

//Export service
export const authService = {
    login
}