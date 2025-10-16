import { Alert, Button, TextField } from '@mui/material'
import style from './LoginForm.module.css'
import useLoginForm from '@hooks/useLoginForm';
import LoadingBackdrop from '@components/common/LoadingBackdrop/LoadingBackdrop';

const LoginForm = () => {
  const {values, inputErrors, error, onChange, onSubmit, loading} = useLoginForm()
  
  return (
    <form className={style.loginFormInputsContainer} onSubmit={onSubmit}>
        {
          error && <Alert severity='error' className={style.error}>{error}</Alert>
        }
        <TextField 
            fullWidth
            label="Email"
            placeholder='tuemail@gmail.com'
            type='email'
            name='email'
            value={values.email}
            onChange={onChange}
            error={Boolean(inputErrors.email)}
            helperText={inputErrors.email}
        />
        <TextField 
            fullWidth
            label="Contraseña"
            placeholder='******'
            type='password'
            name='password'
            value={values.password}
            onChange={onChange}
        />
        <div className={style.buttonFormContainer}>
            <Button variant='contained' type='submit'>Iniciar sesión</Button>
        </div>
        <LoadingBackdrop open={loading}/>
    </form>
  )
}

export default LoginForm