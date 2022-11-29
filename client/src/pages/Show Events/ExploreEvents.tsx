import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {PoshEventObject} from 'interface/poshEventObject'

// Components
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

  // * ** PARAMS **
  // Params Hook + Param Update Logic
  const [searchParams, setSearchParams] = useSearchParams()
  const newParams = new URLSearchParams(searchParams.toString()) // Holds changes to be saved to `searchParams` stateful variable

  // Determin User's Time-Range + store in params
  const setTimeRange = (id: string) => {
    // Update Temporary Variable
    id == 'this-week' ? newParams.set('t', 'week') : ''
    id == 'today' ? newParams.set('t', 'today') : ''
    id == 'thanksgiving' ? newParams.set('t', 'thanksgiving') : ''

    // Save to params
    setSearchParams(newParams.toString())
  }

  // Resolve User's GeoLocation as a city + store in params
  const setGeoLocation = () => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      console.log('🌍 geolocation found!')

      const getGeoLocation = () =>
        new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))

      const assignLocation = async () => {
        try {
          // Store User's Location Coordinates
          const location: any = await getGeoLocation() // eslint-disable-line
          const userLatitude = location.coords.latitude
          const userLongitude = location.coords.longitude
          // Assign City
          if (userLatitude <= 42 && userLatitude >= 38 && userLongitude <= 42 && userLongitude >= 38) {
            newParams.set('city', 'nyc')
          } else if (userLatitude <= 28 && userLatitude >= 23 && userLongitude <= 42 && userLongitude >= 38) {
            newParams.set('city', 'mia')
          } else if (userLatitude <= 36 && userLatitude >= 32 && userLongitude <= 42 && userLongitude >= 38) {
            newParams.set('city', 'la')
          } else {
            newParams.set('city', 'nyc')
          }
          // Save to params
          setSearchParams(newParams.toString())
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

  // * ** EVENTS **
  // Current "Events" Data
  const [poshEvents, setPoshEvents] = useState<PoshEventObject[]>([])

  // Elemental "Fetch" Function
  const fetchPoshEvents = async () => {
    const response = await fetch('http://localhost:4042/api/events')
    console.log('🐕 Fetch Finished!')

    // Parse the JSON into an array of PoshEvent objects
    const json: PoshEventsArray = await response.json()

    if (response.ok) {
      // Tranisition from 'Loading' screen to filtered events via stateful variable
      setLoading(false)

      performFiltering(json)
    } else {
      console.log('🚨 Something went wrong while fetching data ...')
    }
  }

  // Fetch Events on Page Load
  useEffect(() => {
    // * Demo-specific use-case: assign city based on proximity
    newParams.get('city') == 'near' ? setGeoLocation() : ''

    fetchPoshEvents()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const performFiltering = (json: PoshEventsArray) => {
    const filteredEventsByCity = filterByCity(json)
    const filteredResults = filterByTime(filteredEventsByCity)
    filteredResults ? setPoshEvents(filteredResults) : console.log('problem filtering')
  }

  // Filter By City
  const filterByCity = (json: PoshEventsArray) => {
    // Using current 'city' param, Get the the lat & long of said city (stored in our 'cities' hashmap)
    const cityLongLat = cities[newParams.get('city') as CitiesKey]
    // Filter json response by matching lat & long as new Event array
    const filteredEventsByCity = json.filter(el => {
      return el.location.coordinates[0] == cityLongLat.long && el.location.coordinates[1] == cityLongLat.lat
    })
    // Store filtered events (to be itterated-through using eventDetails component)
    return filteredEventsByCity
  }

  // Filter by Time-Range Selection
  const filterByTime = (filteredByCity: PoshEventsArray) => {
    // Get User's desired timeframe from params
    const timeframe = newParams.get('t')

    // Get Users's Current Date
    // const today = new Date()
    // * A User Hard-Coded Date (** Use for additional testing **)
    const today = new Date('11/27/2022')

    // Filter JSON Response by Matching Day(s)
    // ? Should this be moved to 'setTimeRange'?
    // "TODAY"
    if (timeframe == 'today') {
      const filteredEventsByDay = filteredByCity.filter(el => {
        return new Date(el.startUtc).toLocaleDateString('en-US') == today.toLocaleDateString('en-US')
      })

      return filteredEventsByDay
    }
    // "THIS WEEK"
    if (timeframe == 'week') {
      const filteredEventsByWeek = filteredByCity.filter(el => {
        const eventDate = new Date(el.startUtc)

        // How many days from today is the given event?
        const timeFromNow = (+eventDate - +today) / (1000 * 3600 * 24)

        // If less than 7 days (but greater than 0), show that event
        return timeFromNow >= 0 && timeFromNow <= 7
      })

      const eventsSorted = filteredEventsByWeek.sort((a, b) => {
        return +new Date(a.startUtc) - +new Date(b.startUtc)
      })

      return eventsSorted
    }
    // "THANKSGIVING"
    if (timeframe == 'thanksgiving') {
      const thanksgiving = new Date('11/24/2022')
      const filteredEventsByHoliday = filteredByCity.filter(el => {
        return new Date(el.startUtc).toLocaleDateString('en-US') == thanksgiving.toLocaleDateString('en-US')
      })
      return filteredEventsByHoliday
    }
  }

  const handleTimeChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    // Re-Style Buttons
    updateButton(e)
    // Update Params
    setTimeRange(id)
    // Re-Fetch Events (& filter based on new params)
    fetchPoshEvents()
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
                <div className='event-select selected' onClick={e => handleTimeChange(e, 'this-week')}>
                  This Week
                </div>
                <div className='event-select' onClick={e => handleTimeChange(e, 'today')}>
                  Today
                </div>
                <div className='event-select' onClick={e => handleTimeChange(e, 'thanksgiving')}>
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
