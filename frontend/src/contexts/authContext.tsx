import { ReactNode, createContext, useState } from "react";
import { authService } from "@services/auth";
import { AuthBody, User } from "../types/user";
import Cookies from 'js-cookie'

// Definimos los tipos para los datos manejados en el contexto
interface AuthContextType {
  token: string;
  user: User | null;
  login: (body: AuthBody, callback?: () => void) => Promise<void>;
  logout: (callback?: () => void) => void;
  error: string | null,
  loading: boolean
}

// Creamos el contexto de autenticación y lo inicializamos con un objeto vacío
export const AuthContext = createContext<AuthContextType>({
  token: "",
  user: null,
  login: async () => {},
  logout: () => {},
  error: null,
  loading: false,
});

type Props = {
  children: ReactNode;
}

const storedUser = localStorage.getItem('user');

const AuthProvider = ({ children }:Props) => {
  //State donde se guardan los datos del usuario (email y name)
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) as User : null || null
  );
  
  //State donde se almacena el token
  const [token, setToken] = useState(Cookies.get('token') || "");
  //State donde se almacenará el error en caso de haber uno
  const [error, setError] = useState<string | null>(null)
  //Controlamos el loading del componente
  const [loading, setLoading] = useState<boolean>(false)

  //Función encargada de iniciar sesión
  const login = async (body:AuthBody, callback?: ()=> void) => {
    setLoading(true)
    try {
      const res = await authService.login(body)
      
      //Si existe el token:
      if (res.token) {
        //Se guardan los datos del usuario
        setUser({
          email: res.email,
          name: res.name
        });
        //Se guarda el token en el state y en el local storage
        setToken(res.token);

        //Se guarda el usuario en el local storage
        localStorage.setItem("user", JSON.stringify({
          email: res.email,
          name: res.name
        }));
        //Se guarda el token en una cookie
        Cookies.set('token', res.token, {expires: 7})
      }

      //Si existe el callback se ejecutará
      callback && callback()
    } catch (err:any) {
      setError(err.message)
    } finally{
      setLoading(false)
    }
  };

  //Función encargada de cerrar sesión
  const logout = (callback?: ()=> void) => {
    //Limpieza de usuario y token
    setUser(null);
    setToken("");
    Cookies.remove('token')
    setLoading(false)
    //Si existe el callback se ejecutará
    callback && callback()
  };

  return <AuthContext.Provider value={{ token, user, login, logout, error, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;