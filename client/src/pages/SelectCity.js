import React, {useEffect} from 'react'

import {navigation, useNavigate, useSearchParams, createSearchParams, useLocation} from 'react-router-dom'

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

  // Search Params
  const {state} = useLocation()
  const params = {c: 'popular', t: 'week', p: '1', city: ''}
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams(params)

  const goToEvents = () => {
    setSearchParams(params)
    navigate({pathname: '/events', search: `?${createSearchParams(params)}`})
  }

  // const params2 = {c: 'c=popular', t: 't=week', p: 'p=1', city: 'city='}
  // const params3 = 'c=popular&t=week&p=1&city='
  const selectCity = e => {
    // Version 3
    e.currentTarget.id == 'nyc' ? (params.city = 'nyc') : ''
    e.currentTarget.id == 'miami' ? (params.city = 'mia') : ''
    e.currentTarget.id == 'la' ? (params.city = 'la') : ''
    e.currentTarget.id == 'near' ? (params.city = 'near') : ''
    goToEvents()

    // Version 2
    // if (e.currentTarget.id == 'nyc') {
    //   // searchParams.set('city', 'nyc')
    //   setSearchParams({c: 'popular', t: 'week', p: '1', city: 'nyc'})
    // } else if (e.currentTarget.id == 'miami') {
    //   searchParams.set('city', 'mia')
    //   // navigate('/events', {state: params})
    // } else if (e.currentTarget.id == 'la') {
    //   params.city = 'la'
    //   navigate({pathname: '/events', search: `?${createSearchParams(params)}`})

    // } else if (e.currentTarget.id == 'near') {
    //   params.city = 'near'
    //   // navigate('/events', {state: params})
    // }

    // Update Params, Version 1
    // e.currentTarget.id == 'nyc' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'nyc'}) : ''
    // e.currentTarget.id == 'miami' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'mia'}) : ''
    // e.currentTarget.id == 'la' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'la'}) : ''
    // e.currentTarget.id == 'near' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'near'}) : ''

    console.log(searchParams)
    console.log(searchParams.toString())
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
          <div id='nyc' className='gold' onClick={selectCity}>
            <span>🗽 New York</span>
          </div>
          <div id='miami' className='gold' onClick={selectCity}>
            <span>🌴 Miami</span>
          </div>
          <div id='la' className='gold' onClick={selectCity}>
            <span>☀️ Los Angeles</span>
          </div>
          <div id='near' className='' onClick={selectCity}>
            <span>📍 Near Me</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectCity
