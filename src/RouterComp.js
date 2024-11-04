import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Signin from './Component/Signin'
import Createaccount from './Component/Createaccount'
import Movies from './Component/Movies'
const RouterComp = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}></Route>
                <Route path='/signin' element={<Signin/>}></Route>
                <Route path='/createaccount' element={<Createaccount/>}></Route>
                <Route path='/flims' element={<Movies/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default RouterComp