import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <Navbar>
            <Outlet/>
        </Navbar>
    )
}

export default Layout