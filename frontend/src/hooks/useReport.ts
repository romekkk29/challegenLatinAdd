import { useCallback, useState } from "react"
import { salesService } from "@services/sales"
import {useAppSelector } from '@hooks/useAuth'
import {SalesResponse} from "types/sales"
const useReport = () => {
    //Obtenemos el token de nuestra sesión
    const { token } = useAppSelector(state => state.auth)
    //State donde se almacenará el error en caso de haber uno
    const [error, setError] = useState<string | null>(null)
    //Controlamos el loading del componente
    const [loading, setLoading] = useState<boolean>(false)

    const getSales = useCallback(async (callback: (response:SalesResponse[])=> void) => {
        setLoading(true)
        try {
            const res = await salesService.fetchSales({token})
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

    return {getSales,  loading, error}
}

export default useReport