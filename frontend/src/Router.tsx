import LoginView from '@components/views/LoginView/LoginView';
import PrivateRoute from '@components/feature/auth/PrivateRoute/PrivateRoute';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeView from '@components/views/HomeView/HomeView';
import DetailScreenView from '@components/views/DetailScreenView/DetailScreenView';
import Layout from '@components/layout/Layout';
import ProfileView from '@components/views/ProfileView/ProfileView';

/*
  Definimos un router con el objeto createBrowserRouter de react-router-dom. 
  Aquí se determinan las rutas que tendra nuestra app
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute/>,
    children: [
      {
        path: "/",
        element: <Layout/>,
        children: [
          {
            path: "/",
            element: <HomeView/>,
          },
          {
            path: "/screen/:id",
            element: <DetailScreenView/>
          },
          {
            path: "/profile",
            element: <ProfileView/>
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <LoginView/>,
  }
]);
function Router() {

  return (
    <RouterProvider router={router}/>
  )
}

export default Router
