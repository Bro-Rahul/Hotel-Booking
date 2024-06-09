import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'

function App() {
  return (
   <Routes>
    <Route path='' element={<Layout/>}>
      <Route index element={<HomePage/>}></Route>
    </Route>
   </Routes>
  )
}

export default App