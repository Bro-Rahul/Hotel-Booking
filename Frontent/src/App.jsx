import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import HomePage from './pages/homePage'

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />}></Route>
      </Route> */}
      <Route path="/" element={<Layout />} />
    </Routes>
  )
}

export default App