
import { useAuth } from '@hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

//Este componente nos ayuda a validar la autenticación de las rutas privadas de nuestra app
const PrivateRoute = () => {
    const {token} = useAuth()
    const isAuthenticated = token

    //Si el usuario no está autenticado, lo redirigimos a la página de login
    if (!isAuthenticated) {
        return <Navigate to='/login' replace/>
    }
    /*
        En el caso de que el usuario este logueado correctamente se renderiza el componente 
        hijo de la ruta definida en el router (main.tsx)
    */
    return (
        <Outlet />
    )
}

export default PrivateRoute