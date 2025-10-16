import Profile from '@components/feature/profile/Profile/Profile';
import styles from './ProfileView.module.css'

import { useAuth } from '@hooks/useAuth';
import EmptyDataAdvice from '@components/common/EmptyDataAdvice/EmptyDataAdvice';

const ProfileView = () => {
    const {user} = useAuth()

    return (
    <div className={styles.profileContainer}>
        <section className={styles.profileContentBox}>
            <h1>Perfil</h1>
            {
                user ? <Profile user={user}/> : <EmptyDataAdvice/>
            }
            
        </section>
    </div>
  )
}

export default ProfileView