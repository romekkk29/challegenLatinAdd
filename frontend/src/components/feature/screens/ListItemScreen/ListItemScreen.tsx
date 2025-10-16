import { Screen } from 'types/screen'
import styles from './ListItemScreen.module.css'
import { Button, Divider, Typography } from '@mui/material'
import { formatScreenType } from '@lib/utils.string';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  screen:Screen,
}

const ScreenItem = ({screen,}:Props) => {
  //Destructuramos la info proveniente de la pantalla
  const {id, name, type} = screen
  const navigation = useNavigate()

  const redirect = ()=>{
    navigation(`/screen/${id}`)
  }


  return (
    <>
      <div className={styles.itemContainer}>
        <div className={styles.screenNameWrapper}>
          <Link to={`/screen/${id}`} className={styles.screenName}>
            {name}
          </Link>
          <Typography variant='subtitle2' className={styles.screenType}>
            {formatScreenType(type)}
          </Typography>
        </div>
        <div className={styles.actionButtons}>
          <Button onClick={redirect} className={styles.btn}>Ver más</Button>
        </div>
      </div>
      <Divider/>
    </>
  )
}

export default ScreenItem