import React, {useEffect} from 'react'

import {navigation, useNavigate, useSearchParams, createSearchParams, useLocation} from 'react-router-dom'

import useConfetti from 'hooks/useConfetti.js'
import JSConfetti from 'js-confetti'

const canvasStyle = {
  zIndex: '2',
  position: 'absolute',
  pointerEvents: 'none',
  inset: '0px',
}

const SelectCity = props => {
  // * SCRIPTS
  // useConfetti()
  const jsConfetti = new JSConfetti()
  const canvas = document.getElementById('posh-canvas')
  jsConfetti.addConfetti({
    canvas,
    confettiRadius: 6,
    confettiNumber: 500,
    confettiColors: ['#ffcc00'],
    particleCount: 2,
  })

  // Navigation
  const navigate = useNavigate()
  const params = {c: 'popular', t: 'week', p: '1', city: ''}

  // Params State
  const [searchParams, setSearchParams] = useSearchParams(params)

  // Navigate
  const goToEvents = () => {
    setSearchParams(params)
    navigate({pathname: '/events', search: `?${createSearchParams(params)}`})
  }

  // Update & Push params
  const selectCity = (e, city) => {
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
      <canvas id='posh-canvas' width='1296' height='991' style={canvasStyle}></canvas>
      <div className='flex-container'>
        <div className='city-selector-prompt'>Where are you looking for experiences?</div>
        <div className='city-selector-cities'>
          <div className='gold' onClick={e => selectCity(e, 'nyc')}>
            <span>🗽 New York</span>
          </div>
          <div className='gold' onClick={e => selectCity(e, 'miami')}>
            <span>🌴 Miami</span>
          </div>
          <div className='gold' onClick={e => selectCity(e, 'la')}>
            <span>☀️ Los Angeles</span>
          </div>
          <div className='' onClick={e => selectCity(e, 'near')}>
            <span>📍 Near Me</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectCity
