import style from './Home.module.css'
import ScreensControl from '@components/feature/screens/ScreensControl/ScreensControl'

const HomeView = () => {
  return (
    <div className={style.homeContainer}>
        <ScreensControl/>
    </div>
  )
}

export default HomeView