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
  // const {state} = useLocation()

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

  // Style 'selected' Button
  const updateButton = e => {
    const eventButtons = Array.from(document.getElementsByClassName('event-select'))
    eventButtons.forEach(x => x.classList.remove('selected'))

    e.currentTarget.classList.add('selected')
  }

  // Params
  const [searchParams, setSearchParams] = useSearchParams()

  // Handle User Time-Range Selection
  const selectTimeRange = (e, id) => {
    // Style Button
    updateButton(e)
    // Store Params
    let newParams = new URLSearchParams(searchParams.toString())

    // Update Params
    id == 'this-week' ? newParams.set('t', 'week') : ''
    id == 'today' ? newParams.set('t', 'today') : ''
    id == 'thanksgiving' ? newParams.set('t', 'thanksgiving') : ''

    // Update 'searchParams'
    setSearchParams(newParams.toString())

    console.log('searchParams', searchParams)
    console.log('searchParams to string:', searchParams.toString())
  }

  // * TEMPLATE
  return (
    <div>
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
                <div className='event-select selected' onClick={e => selectTimeRange(e, 'this-week')}>
                  This Week
                </div>
                <div className='event-select' onClick={e => selectTimeRange(e, 'today')}>
                  Today
                </div>
                <div className='event-select' onClick={e => selectTimeRange(e, 'thanksgiving')}>
                  🦃 Thanksgiving
                </div>
              </div>
            </div>
            <div className='explore-body-main-results event-card-grid'>
              <div className='events'>{events && events.map(event => <p key={event._id}>{event.name}</p>)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* "Back" Button */}
      <button onClick={() => navigate('/explore')}>
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
