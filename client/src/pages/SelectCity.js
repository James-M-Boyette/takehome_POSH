import React, {useEffect} from 'react'
import {createSearchParams, navigation, useLocation, useNavigate, useSearchParams} from 'react-router-dom'

import useConfetti from 'hooks/useConfetti.js'

const canvasStyle = {
  zIndex: '2',
  position: 'absolute',
  pointerEvents: 'none',
  inset: '0px',
}

const SelectCity = props => {
  // * SCRIPTS
  // useConfetti()

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

  const selectCity = (e, city) => {
    // Version 3
    city == 'nyc' ? (params.city = 'nyc') : ''
    city == 'miami' ? (params.city = 'mia') : ''
    city == 'la' ? (params.city = 'la') : ''
    city == 'near' ? (params.city = 'near') : ''
    goToEvents()
  }

  const c = searchParams.get('c')
  const t = searchParams.get('t')
  const p = searchParams.get('p')
  const city = searchParams.get('city')

  useEffect(() => {
    console.log(c, t, p, city)
  }, [c, t, p, city])

  // const selectCity = e => {
  //   // Update Params
  //   e.currentTarget.id == 'nyc' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'nyc'}) : ''
  //   e.currentTarget.id == 'miami' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'mia'}) : ''
  //   e.currentTarget.id == 'la' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'la'}) : ''
  //   e.currentTarget.id == 'near' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'near'}) : ''
  // }

  // * TEMPLATE
  return (
    <div className='city-selector'>
      <canvas width='1296' height='991' style={canvasStyle}></canvas>
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
