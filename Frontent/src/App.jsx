import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import SearchList from './pages/SearchHotelListPage'
import { authenticateFromLocalStore } from './utils'
import HomePage from './pages/homePage'
import ProductDetaile from './pages/hotelDetailePage'
import ErrorPage from './components/Error/error'
import LoginRegister from './pages/authenticationPage'
import { LoginAction } from './components/login/login'
import { RegisterAction } from './pages/authenticationPage'
import AdminPanel from './pages/adminPanelPage'
import './index.css'

const route = createBrowserRouter([
  {path: '',element: <HomePage/>},
  {path:'sort' , element: <SearchList/>},
  {path:'sort/detaile' , element:<ProductDetaile/>,errorElement:<ErrorPage/>},
  {path:'login',element:<LoginRegister/>,action:LoginAction},
  {path:'register',element:<LoginRegister/>,action:RegisterAction},
  {path:'admin',element:<AdminPanel/>},
]);
function App() {
  authenticateFromLocalStore()

 
  return (
    <>
      <RouterProvider router={route}>
      </RouterProvider>
    </>
  )
}

export default App
