import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

// components
import EventDetails from '../components/EventDetails'

type poshEventObject = {
  _id: string
  name: string
  flyer: string
  groupAvi: string
  timezone: string
  startUtc: Date
  endUtc: Date
  url: string
  venueName: string
  groupName: string
  location: {
    coordinates: number[] // ? Check this data type
    type: string
  }
}

const ExploreEvents = () => {
  // * SCRIPTS

  // Fetch "Events" Data
  const [poshEvents, setPoshEvents] = useState<poshEventObject[]>([])

  useEffect(() => {
    const fetchPoshEvents = async () => {
      const response = await fetch('http://localhost:4042/api/events')
      console.log('🐕 Fetch Finished!')

      // Parse the json
      const json = await response.json()

      if (response.ok) {
        // console.log('Events came back:', json) // For debugging
        setLoading(false)
        setPoshEvents(json)
      } else {
        console.log('🚨 Something went wrong with data fetch ...')
      }
    }

    fetchPoshEvents()
  }, [])

  // "Back" arrow/button Navigation
  const navigate = useNavigate()

  // Style Nav Button
  const removeSelectedClass = () => {
    const eventButtons: Element[] = Array.from(document.getElementsByClassName('event-select'))
    eventButtons.forEach(button => button.classList.remove('selected'))
  }
  const updateButton = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    removeSelectedClass()
    e.currentTarget.classList.add('selected')
  }

  // Params Hook + Store Params
  const [searchParams, setSearchParams] = useSearchParams()
  let newParams = new URLSearchParams(searchParams.toString())

  // Handle User Time-Range Selection
  const selectTimeRange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    // Re-Style Buttons
    updateButton(e)

    // Update Params
    id == 'this-week' ? newParams.set('t', 'week') : ''
    id == 'today' ? newParams.set('t', 'today') : ''
    id == 'thanksgiving' ? newParams.set('t', 'thanksgiving') : ''

    // Update 'searchParams'
    setSearchParams(newParams.toString())
  }

  // Handle Loading
  const [loading, setLoading] = useState(true)

  // * TEMPLATE
  return (
    <div>
      {/* Event Content */}
      <div className='explore'>
        <video
          autoPlay={true}
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
              {poshEvents && poshEvents.map(poshEvent => <EventDetails key={poshEvent._id} poshEvent={poshEvent} />)}
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
      <div className={loading ? 'explore-loader no-pointer' : 'explore-loader no-pointer fade-out'}>
        <canvas width='942' height='1048'></canvas>
        <div className='explore-loader-inner'>
          <div className='explore-loader-text '>Finding the best events for you...</div>
          <div className='explore-loader-load-bar '>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreEvents
