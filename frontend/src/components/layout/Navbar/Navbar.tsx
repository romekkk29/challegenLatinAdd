import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { Typography,Badge, AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, useMediaQuery } from '@mui/material'
import { navLinks } from '@lib/utils.misc'
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '@assets/logo.svg'
import { logout } from '@redux/authSlice'
import { useAppDispatch, useAppSelector } from '@hooks/useAuth'
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Fragment, ReactNode, useState,useEffect } from 'react';
import { getFirstname } from '@lib/utils.string';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined' 
import usePayments from '@hooks/usePayments';
import { Screen } from "./../../../types/screen"

const drawerWidth = 240

type Props = {
    children: ReactNode
}

const Navbar = ({children}:Props) => {
    const dispatch = useAppDispatch()
    const desktop = useMediaQuery('(min-width:768px)');
    //Utilizamos el hook de react-router
    const navigation = useNavigate()
    //Utilizamos nuestro hook para cerrar sessión
    const { user } = useAppSelector(state => state.auth)
    //Control de apertura menú
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    //control del menú perfil

    const {getNonPayments} = usePayments()
    const [screenNonPayments,setScreenNonPayments]=useState<Screen[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openAccountMenu = Boolean(anchorEl);
    const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null) 
    const openNotifMenu = Boolean(anchorNotif) 

    const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAccountMenu = () => {
        setAnchorEl(null);
    };

    //Alternamos la visualización del menú
    const toggleMenu = ()=> setMenuIsOpen(!menuIsOpen)
    
    const redirect = (path:string)=>{
        navigation(path)
        toggleMenu()
    }

    const handleLogout = async () => {
        await dispatch(logout())
    }
    const handleOpenNotifMenu = (event: React.MouseEvent<HTMLElement>) => { 
        setAnchorNotif(event.currentTarget)
    }

    const handleCloseNotifMenu = () => { 
        setAnchorNotif(null)
    }

    useEffect(() => {
        // Ejecutar al montar
        getNonPayments((response: Screen[]) => {
            setScreenNonPayments(response);
        });

        // Crear intervalo
        const interval = setInterval(() => {
            getNonPayments((response: Screen[]) => {
                setScreenNonPayments(response);
                console.log("Actualizado:", response);
            });
        }, 15000); // 15 segundos

        // Limpiar intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [getNonPayments]);

    return (
        <div className={styles.navWrapper}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ 
                    width: desktop ? `calc(100% - ${drawerWidth}px)` : '100%', 
                    ml: `${drawerWidth}px`,
                    borderBottom: '1px solid #ddd'
                }}
                color='inherit'
                elevation={0}
            >
                <Toolbar className={styles.toolbar}>
                    {
                        !desktop &&
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleMenu}>
                                <MenuIcon/>
                            </IconButton>
                    }
                    <h2 className={styles.title}>
                        Administración
                    </h2>
                    {/*  Icono de notificaciones */}
                        <IconButton color="primary" sx={{marginRight:"10px"}} onClick={handleOpenNotifMenu}>
                            <Badge badgeContent={screenNonPayments.length} color="error">
                            <NotificationsNoneOutlinedIcon />
                            </Badge>
                        </IconButton>

                        {/*  Menú desplegable de notificaciones */}
                        <Menu
                        anchorEl={anchorNotif}
                        open={openNotifMenu}
                        onClose={handleCloseNotifMenu}
                        PaperProps={{
                        }}
                        >
                        <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 600 }}>
                            Falta de pago
                        </Typography>
                        <Divider />

                        {screenNonPayments.map((n, i) => (
                            <Fragment key={n.id}>
                            <MenuItem onClick={handleCloseNotifMenu}>
                                <Typography variant="body2">{n.name}</Typography>
                            </MenuItem>
                            {i < screenNonPayments.length - 1 && <Divider />}
                            </Fragment>
                        ))}
                        </Menu>
                   
                    {
                        desktop && user && <h3 className={styles.welcomeText}>Hola, {getFirstname(user.name)}!</h3>
                    }
                    
                    <div>
                        <IconButton onClick={handleOpenAccountMenu}>
                            <PersonOutlineOutlinedIcon/>
                        </IconButton>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={openAccountMenu}
                        onClose={handleCloseAccountMenu}
                    >
                        <MenuItem onClick={()=> navigation('/profile')}>
                            <ListItemIcon>
                                <AccountCircleOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText>Perfil</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={()=> handleLogout()}>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText>Cerrar sesión</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: desktop ? drawerWidth : '70%',
                    flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: desktop ? drawerWidth : '70%',
                            boxSizing: 'border-box',
                    },
                }}
                variant={desktop ? "permanent" : "temporary"}
                anchor="left"
                open={menuIsOpen}
                onClose={toggleMenu}
            >
                <Toolbar className={styles.logoContainer}>
                    <img src={logo} alt="Logo LatinAD" />
                </Toolbar>
                <Divider />
                <List className={styles.navItemsContainer}>
                    {navLinks.map((section, i) => (
                        <Fragment key={i}>
                            {
                                section.map((link)=>(
                                    <ListItem 
                                        key={link.path} 
                                        disablePadding
                                    >
                                        <ListItemButton
                                            disabled={link.disabled} 
                                            onClick={()=> redirect(link.path)}
                                        >
                                            <ListItemIcon >
                                                <link.icon/>
                                            </ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                            <Divider/>
                        </Fragment>
                    ))}
                </List>
            </Drawer>
            <div className={styles.content}>
                <Toolbar/>
                {children}
            </div>
        </div>
    )
}

export default Navbar