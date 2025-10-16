import { Paper, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import logo from '@assets/logo.svg'
import styles from './Login.module.css'
import LoginForm from '../LoginForm/LoginForm';

//Login form container component
const Login = () => {
    
    return (
        <Paper className={styles.loginFormContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Logo LatinAD" className={styles.logo}/>
                </div>
                <Typography 
                    variant='h5' 
                    component="h2"
                    fontWeight={500}
                    className={styles.loginTitle}
                >
                    <LoginIcon fontSize='small'/>
                    Accede a tu cuenta
                </Typography>
                {/* Renderizamos el formulario */}
                <LoginForm/>
        </Paper>
    )
}

export default Login