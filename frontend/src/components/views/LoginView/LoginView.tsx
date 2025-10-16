import Login from '@components/feature/auth/Login/Login'
import style from './LoginView.module.css'
import BackgroundCube from '@components/common/BackgroundCube/BackgroundCube'

const LoginView = () => {
  return (
    <div className={style.loginContainer}>
      <Login/>
      <BackgroundCube/>
    </div>
  )
}

export default LoginView