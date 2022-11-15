import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

import '../src/assets/webfonts/Nunito/Nunito-Black.ttf'
import './assets/stylesheets/styles.scss'

import IFrames from './components/IFrames'
import NavBar from './components/NavBar'
// import Home from './pages/Home'
import ExploreEvents from './pages/ExploreEvents'
import SelectCity from './pages/SelectCity'

const App = () => {
  // * SCRIPTS

  // * TEMPLATE
  return (
    <div className='App'>
      <BrowserRouter>
        {/* <NavBar /> */}
        <div className='posh-pages'>
          <Routes>
            <Route path='/' element={<Navigate replace to='/explore' />} />
            <Route path='/explore' element={<SelectCity />} />
            <Route path='/events' element={<ExploreEvents />} />
          </Routes>
        </div>
      </BrowserRouter>
      {/* <IFrames /> */}
    </div>
  )
}

export default App
