import { Avatar, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import styles from './Profile.module.css'
import { User } from 'types/user';

type Props = {
  user: User
}

const Profile = ({user}:Props) => {
  return (
    <Paper className={styles.profileDataContainer}>
        <div className={styles.avatarContainer}>
            <Avatar alt={user.name} src="/static/images/avatar/1.jpg" className={styles.avatar}/>
            <Chip icon={<BuildCircleOutlinedIcon/>} label={'Administrador'} color='secondary'/>
        </div>
        <div className={styles.infoContainer}>
            <List>
                <ListItem>
                    <ListItemIcon><AssignmentIndOutlinedIcon/></ListItemIcon>
                    <ListItemText primary="Nombre" secondary={user.name}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon><EmailOutlinedIcon/></ListItemIcon>
                    <ListItemText primary="Email" secondary={user?.email}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon><LocalPhoneOutlinedIcon/></ListItemIcon>
                    <ListItemText primary="Teléfono" secondary="2634786580"/>
                </ListItem>
            </List>
        </div>
    </Paper>
  )
}

export default Profile