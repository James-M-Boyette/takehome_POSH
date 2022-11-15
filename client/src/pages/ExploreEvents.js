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
  const {state} = useLocation()
  // const {c, t, p, city} = state

  useEffect(() => {
    const fetchEvents = async () => {
      // Fetch our data
      /**
      *   const response = await fetch("http://localhost:4043/api/workouts");
      
      *   Note: the above will cause a CORS error. One option is to install the 'CORS' package in our backend. The other, easier way is to
            1. Add `"proxy": "http://localhost:4000",` to our FE's package.json &
            2. remove the host+port portion of this url ...
          Now, we can use the shortened fetch url below without issue:
      */
      const response = await fetch('/api/events')

      // Parse the json
      const json = await response.json()

      if (response.ok) {
        console.log('Events came back:', json)
        setEvents(json) // only needed for the pre-Video #11 `useState()` hook
        // dispatch({ type: "SET_WORKOUTS", payload: json }); // Video #11 - our 'WorkoutContext' context has logic that, when passed this "action" object ('type' and 'payload'), will update our 'workouts' object above (using the `useWorkoutsContext()` hook to execute a 'reducer()' switch ... o.O)
      } else {
        console.log('Something went wrong with data fetch ...')
      }
    }

    fetchEvents()
  }, [])

  // "Back" arrow/button Navigation
  const navigate = useNavigate()

  // Search Params
  const [searchParams, setSearchParams] = useSearchParams()

  const c = searchParams.get('c')
  const t = searchParams.get('t')
  const p = searchParams.get('p')
  const city = searchParams.get('city')

  // 'Selected' "Event" Button
  const selectCategory = e => {
    // Update Button Class/Styling
    const eventButtons = Array.from(document.getElementsByClassName('event-select'))
    eventButtons.forEach(x => x.classList.remove('selected'))

    e.currentTarget.classList.add('selected')

    // Update Params
    // router.push(`/reports/parcel?` + new URLSearchParams({id: currentId}))
    e.currentTarget.id == 'this-week' ? setSearchParams({c: 'popular', t: 'week', p: '1', city: 'nyc'}) : ''
    e.currentTarget.id == 'today' ? setSearchParams({c: 'popular', t: 'today', p: '1', city: 'nyc'}) : ''
    e.currentTarget.id == 'thanksgiving' ? setSearchParams({c: 'popular', t: 'thanksgiving', p: '1', city: 'nyc'}) : ''
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
                <div id='this-week' className='event-select selected' onClick={selectCategory}>
                  This Week
                </div>
                <div id='today' className='event-select' onClick={selectCategory}>
                  Today
                </div>
                <div id='thanksgiving' className='event-select' onClick={selectCategory}>
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
