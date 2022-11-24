import React from 'react'
import {createSearchParams, useNavigate, useSearchParams} from 'react-router-dom'

import JSConfetti from 'js-confetti'

const SelectCity = () => {
  // * SCRIPTS
  const jsConfetti = new JSConfetti()
  // const canvas = document.getElementById('posh-canvas')
  jsConfetti.addConfetti({
    // canvas, // TODO Need more research to make this work succesfully
    confettiRadius: 6,
    confettiNumber: 500,
    confettiColors: ['#ffcc00'],
  })

  // Navigation
  const navigate = useNavigate()
  const params = {c: 'popular', t: 'week', p: '1', city: ''} // *Hardcoded bc this is how I understand Posh's 'explore' page to be currently set up; would've used `useSearchParams()` hook otherwise ...

  // Params State
  const [searchParams, setSearchParams] = useSearchParams(params) // eslint-disable-line 

  // Navigate
  const goToEvents = () => {
    setSearchParams(params)
    navigate({pathname: '/events', search: `?${createSearchParams(params)}`})
  }

  // Update & Push params
  const selectCity = (city: string) => {
    // Version 3
    city == 'nyc' ? (params.city = 'nyc') : ''
    city == 'miami' ? (params.city = 'mia') : ''
    city == 'la' ? (params.city = 'la') : ''
    city == 'near' ? (params.city = 'near') : ''
    goToEvents()
  }

  // * TEMPLATE
  return (
    <div className='city-selector'>
      {/* <canvas id='posh-canvas' width='1296' height='991' style={canvasStyle}></canvas> // See 'confetti' note above re: more research needed ... */}
      <div className='flex-container'>
        <div className='city-selector-prompt'>Where are you looking for experiences?</div>
        <div className='city-selector-cities'>
          <div className='gold' onClick={() => selectCity('nyc')}>
            <span>🗽 New York</span>
          </div>
          <div className='gold' onClick={() => selectCity('miami')}>
            <span>🌴 Miami</span>
          </div>
          <div className='gold' onClick={() => selectCity('la')}>
            <span>☀️ Los Angeles</span>
          </div>
          <div className='' onClick={() => selectCity('near')}>
            <span>📍 Near Me</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectCity
