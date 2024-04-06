import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StockDetailPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'
import NotFound from './pages/NotFound'

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<StockOverviewPage />}>
          </Route>
          <Route path='/StockDetailPage' element = {<StockDetailPage />}>
          </Route>
          <Route path='*' element ={<NotFound />}>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
