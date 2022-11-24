import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

// import {fetchPoshEvents} from '../../components/Show Events/fetchEvents'
import {PoshEventObject} from 'interface/poshEventObject'

// components
import EventDetails from '../../components/Show Events/EventDetails'

type PoshEventsArray = Array<PoshEventObject>

const cities = {
  nyc: {
    long: '-73.935242',
    lat: '40.73061',
  },
  mia: {
    long: '-80.191788',
    lat: '25.761681',
  },
  la: {
    long: '-118.321495',
    lat: '34.134117',
  },
}

type CitiesKey = keyof typeof cities

const ExploreEvents = () => {
  // * SCRIPTS

  // * ** PAGE ELEMENTS **
  // Handle Loading
  const [loading, setLoading] = useState(true)

  // "Back" arrow/button Navigation
  const navigate = useNavigate()

  // Style "Time" Nav Button
  const removeSelectedClass = () => {
    const eventButtons: Element[] = Array.from(document.getElementsByClassName('event-select'))
    eventButtons.forEach(button => button.classList.remove('selected'))
  }
  const updateButton = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    removeSelectedClass()
    e.currentTarget.classList.add('selected')
  }

  // * ** EVENTS **
  // Fetch "Events" Data
  const [poshEvents, setPoshEvents] = useState<PoshEventObject[]>([])

  const fetchPoshEvents = async () => {
    const response = await fetch('http://localhost:4042/api/events')
    console.log('🐕 Fetch Finished!')

    // Parse the JSON into an array of PoshEvent objects
    const json: PoshEventsArray = await response.json()

    if (response.ok) {
      // Tranisition from 'Loading' screen to filtered events
      setLoading(false)
      console.log('PARAMS city :', newParams.get('city'))
      // Filter JSON Results by 'Near Me'
      if (newParams.get('city') == 'near') {
        geoLocate()
      } else {
        // Filter JSON Results by City
        filterByCity(json)
      }
    } else {
      console.log('🚨 Something went wrong with data fetch ...')
    }
  }

  useEffect(() => {
    fetchPoshEvents()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Filter By City
  const filterByCity = (json: PoshEventsArray) => {
    const cityLongLat = cities[newParams.get('city') as CitiesKey]
    const filteredEvents = json.filter(el => {
      return el.location.coordinates[0] == cityLongLat.long && el.location.coordinates[1] == cityLongLat.lat
    })
    // Store filtered events (to be itterated-through using eventDetails component)
    setPoshEvents(filteredEvents)
  }

  // GeoLocation
  const geoLocate = () => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      console.log('🌍 geolocation found!')

      const getGeoLocation = () =>
        new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))

      const assignLocation = async () => {
        try {
          // Store location coordinates
          const location: any = await getGeoLocation() // eslint-disable-line 
          const userLatitude = location.coords.latitude
          const userLongitude = location.coords.longitude
          console.log('Stored location coordinates: ', userLatitude, userLongitude)
          // Assign City
          if (userLatitude <= 42 && userLatitude >= 38 && userLongitude <= 42 && userLongitude >= 38) {
            console.log(userLatitude, userLongitude, 'N.Y.C')
            newParams.set('city', 'nyc')
          } else if (userLatitude <= 28 && userLatitude >= 23 && userLongitude <= 42 && userLongitude >= 38) {
            console.log(userLatitude, userLongitude, 'MIA')
            newParams.set('city', 'mia')
          } else if (userLatitude <= 36 && userLatitude >= 32 && userLongitude <= 42 && userLongitude >= 38) {
            console.log(userLatitude, userLongitude, 'L.A.')
            newParams.set('city', 'la')
          } else {
            console.log(userLatitude, userLongitude, 'DEFAULTED to NYC')
            newParams.set('city', 'nyc')
          }
          fetchPoshEvents()
        } catch (e) {
          console.log('ERROR', e.message)
        }
      }
      assignLocation()
    } else {
      /* geolocation IS NOT available */
      console.log('🌍❌ geolocation NOT found ...')
    }
  }

  // * ** PARAMS **
  // Params Hook + Store Params
  const [searchParams, setSearchParams] = useSearchParams()
  const newParams = new URLSearchParams(searchParams.toString())

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
