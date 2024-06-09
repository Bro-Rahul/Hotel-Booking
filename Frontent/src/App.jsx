import SearchList from './pages/SearchHotelListPage'
import { authenticateFromLocalStore } from './utils'
import HomePage from './pages/homePage'
import ProductDetaile from './pages/hotelDetailePage'
import LoginRegister from './pages/authenticationPage'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout/Layout'
function App() {
  authenticateFromLocalStore()


  return (
    <>
      <Routes>
        <Route path='' element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path='sort' element={<SearchList />}>
            <Route path='detaile' element={<ProductDetaile />}></Route>
          </Route>
          <Route path='login' element={<LoginRegister/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
