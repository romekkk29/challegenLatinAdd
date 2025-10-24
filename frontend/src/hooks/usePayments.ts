import { useCallback, useState } from "react"
import { paymentsService } from "@services/payments"
import {useAppSelector } from '@hooks/useAuth'
import { Screen } from "../types/screen"
const usePayments = () => {
    //Obtenemos el token de nuestra sesión
    const { token } = useAppSelector(state => state.auth)
    //State donde se almacenará el error en caso de haber uno
    const [error, setError] = useState<string | null>(null)
    //Controlamos el loading del componente
    const [loading, setLoading] = useState<boolean>(false)

    const getNonPayments = useCallback(async (callback: (response:Screen[])=> void) => {
        setLoading(true)
        try {
            const res = await paymentsService.fetchNonPayments({token})
            if (res) {
                callback(res)
                return res
            }
            
        } catch (error:any) {
            console.error(error)
            setError(error.message)
            throw Error(error.message)
        } finally{
            setLoading(false)
        }
    }, [token])

    return {getNonPayments,  loading, error}
}

export default usePayments