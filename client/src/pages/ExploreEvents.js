import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams, useLocation} from 'react-router-dom'

// components
import EventDetails from '../components/EventDetails.js'

const canvasStyle = {
  zIndex: 2,
  position: 'absolute',
  pointerEvents: 'none',
  inset: '0px',
}

const ExploreEvents = props => {
  // * SCRIPTS
  // Display "Events"
  const [events, setEvents] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events')

      // Parse the json
      const json = await response.json()

      if (response.ok) {
        console.log('Events came back:', json)
        setEvents(json)
      } else {
        console.log('Something went wrong with data fetch ...')
      }
    }

    fetchEvents()
  }, [])

  // "Back" arrow/button Navigation
  const navigate = useNavigate()

  /**
   * ! PARAMS
   */

  // Set the clicked button to 'selected'
  const updateButton = e => {
    const eventButtons = Array.from(document.getElementsByClassName('event-select'))
    eventButtons.forEach(x => x.classList.remove('selected'))

    e.currentTarget.classList.add('selected')
  }

  // TODO Params
  // const {state} = useLocation()
  // const {c, t, p, city} = state
  let params = new URL(document.location).searchParams

  // Search Params
  const [searchParams, setSearchParams] = useSearchParams()

  let newParams = new URLSearchParams(searchParams.toString())

  const c = searchParams.get('c')
  const t = searchParams.get('t')
  const p = searchParams.get('p')
  const city = searchParams.get('city')

  // Handle User Time-Range Selection
  const selectTimeRange = e => {
    // Style Button
    updateButton(e)

    // Store Params
    const params = {}

    // Update Params
    // TODO: convert `e.currentTarget.id` to a passed argument of the same string, and remove each button's ID
    e.currentTarget.id == 'this-week' ? newParams.set('t', 'week') : ''
    e.currentTarget.id == 'today' ? newParams.set('t', 'today') : ''
    e.currentTarget.id == 'thanksgiving' ? newParams.set('t', 'thanksgiving') : ''
    // e.currentTarget.id == 'this-week' ? params.t = 'week' : ''
    // e.currentTarget.id == 'today' ? params.t = 'today' : ''
    // e.currentTarget.id == 'thanksgiving' ? params.t = 'thanksgiving' : ''

    // Update 'searchParams'
    setSearchParams(newParams.toString())
    // setSearchParams(params)

    // router.push(`/reports/parcel?` + new URLSearchParams({id: currentId}))
    // e.currentTarget.id == 'this-week' ? (params.t = 'week') : ''
    // e.currentTarget.id == 'this-week' ? searchParams.set('t', 'week') : ''
    e.currentTarget.id == 'this-week' ? searchParams.set('t', 'week') : ''
    e.currentTarget.id == 'today' ? setSearchParams({c: 'popular', t: 'today', p: '1', city: 'nyc'}) : ''
    e.currentTarget.id == 'thanksgiving' ? setSearchParams({c: 'popular', t: 'thanksgiving', p: '1', city: 'nyc'}) : ''

    // console.log('state:', state)
    console.log('Params:', params)
    console.log('searchParams', searchParams)
    console.log('searchParams to string:', searchParams.toString())
  }

  // Temporary console log
  useEffect(() => {
    console.log(c, t, p, city)
  }, [c, t, p, city])

  // * TEMPLATE
  return (
    <div>
      <div>
        <h1 style={{color: 'white'}}>Test</h1>
        {c && <p style={{color: 'white'}}>Category: {c}</p>}
        {t && <p style={{color: 'white'}}>Timeframe: {t}</p>}
        {p && <p style={{color: 'white'}}>Page: {p}</p>}
        {city && <p style={{color: 'white'}}>City: {city}</p>}
        <button onClick={() => setSearchParams({c: 'popular', t: 'week'})}>Change Params</button>
        {/* Note: you need to set all K:Vs - if you leave 'dog' out, the new query will only have 'food' */}
        {/* <button onClick={today}>Change Params 2</button> */}
      </div>
      {/* Event Content */}
      <div className='explore'>
        <video
          autoPlay={true}
          playsInline=''
          loop={true}
          className='explore-video false'
          src='https://posh-b2.s3.us-east-2.amazonaws.com/meta+(1).mp4'></video>
        <div className='explore-cover'>
          <video
            autoPlay={true}
            playsInline={true}
            loop={true}
            className='explore-cover-video false'
            src='https://posh-b2.s3.us-east-2.amazonaws.com/meta+(1)_1.mp4'></video>
        </div>
        <div className='explore-body'>
          <div className='explore-body-main'>
            <div className='explore-body-main-nav'>
              <div className='explore-body-main-nav-right'>
                {/* <div id="this-week-button" className='selected' onClick={thisWeek}> */}
                <div id='this-week' className='event-select selected' onClick={selectTimeRange}>
                  This Week
                </div>
                <div id='today' className='event-select' onClick={selectTimeRange}>
                  Today
                </div>
                <div id='thanksgiving' className='event-select' onClick={selectTimeRange}>
                  🦃 Thanksgiving
                </div>
              </div>
            </div>
            <div className='explore-body-main-results event-card-grid'>
              <div className='events'>
                {events &&
                  events.map(event => (
                    <p key={event._id}>{event.name}</p>

                    // NOTE: the first version above is good for initially testing your connection to the back end. Once that's set, switching to a component injection is recommended.
                    // <EventDetails key={event._id} event={event} /> // Note that, just like in Vue, we need a unique 'key' in order to display a list ...
                    // Also note that we're declaring a 'workout' prop, and passing _ via 'workout'
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Back" Button */}
      <button onClick={() => navigate(-1)}>
        <img
          src='https://posh-b2.s3.us-east-2.amazonaws.com/left-arrow-in-circular-button-black-symbol.svg'
          className='explore-back'></img>
      </button>
      {/* "Loading" placeholder*/}
      {/* <div className='explore-loader fade-out no-pointer'>
        <canvas width='942' height='1048' style={canvasStyle}></canvas>
        <div className='explore-loader-inner'>
          <div className='explore-loader-text '>Finding the best events for you...</div>
          <div className='explore-loader-load-bar '>
            <div></div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ExploreEvents
