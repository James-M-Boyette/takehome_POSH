import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

// components
import EventDetails from '../components/EventDetails'

import {PoshEventObject} from 'interface/poshEventObject'

// interface City {
//   [nyc:string]:{
//     long: string
//     lat: string
//   }
//   mia:{
//     long: string
//     lat: string
//   }
//   la:{
//     long: string
//     lat: string
//   }
// }

// const cities:City = {
const cities = {
  nyc: {
    long: "-73.935242",
    lat: "40.73061"
  },
  mia: {
    long: "-80.191788",
    lat: "25.761681"
  },
  la: {
    long: "-118.321495",
    lat: "34.134117"
  },
}

type CitiesKey = keyof typeof cities

const ExploreEvents = () => {
  // * SCRIPTS

  // Fetch "Events" Data
  const [poshEvents, setPoshEvents] = useState<PoshEventObject[]>([])

  useEffect(() => {
    const fetchPoshEvents = async () => {
      const response = await fetch('http://localhost:4042/api/events')
      console.log('🐕 Fetch Finished!')

      // Parse the json
      const json = await response.json()
      // let filteredResults = null

      if (response.ok) {
        // console.log('Events came back:', json) // For debugging
        setLoading(false)
        // console.log('json: ', json);
        // console.log('filtered json (single object): ', json[0].location.coordinates);
        // const paramsCity = newParams.get('city') as CitiesKey

        // Get the current 'city' param, and store its coordinates from the 'cities' object
        const cityLongLat = cities[newParams.get('city') as CitiesKey]
        // console.log('city params: ', paramsCity);
        // const paramsCityLong = cities[paramsCity].long
        // const paramsCityLong = cities[paramsCity]
        // console.log('city params longitude: ', paramsCityLong);
        console.log('city long & lat: ', cityLongLat);
        

        // const matchedLong = json.filter((el:any) => {
        //   return el.location.coordinates[0] == "-73.935242";   
        // });
        const filteredEvents = json.filter((el:any) => {
          // return (el.location.coordinates[0] == cities.nyc.long && el.location.coordinates[1] == cities.nyc.lat);   
          return (el.location.coordinates[0] == cityLongLat.long && el.location.coordinates[1] == cityLongLat.lat);   
        });
        console.log('filtered json (multiple objects): ', filteredEvents)
        setPoshEvents(filteredEvents)
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

  // GeoLocation
  let userGeoLocation = null
  const geoLocate = () => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      console.log('🌍 geolocation found!')
      navigator.geolocation.getCurrentPosition(position => {
        userGeoLocation = position.coords
        console.log('🎯 User lat, long: ', userGeoLocation.latitude, userGeoLocation.longitude)
      })
    } else {
      /* geolocation IS NOT available */
      console.log('🌍❌ geolocation NOT found ...')
    }
  }
  geoLocate()

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
