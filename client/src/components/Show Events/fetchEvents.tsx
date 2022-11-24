import React, {useEffect, useState, FunctionComponent} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {PoshEventObject} from 'interface/poshEventObject'

interface PoshEventsArray extends Array<PoshEventObject>{}

export const fetchPoshEvents = async () => {
    // Handle Loading
    const [loading, setLoading] = useState(true)

  const response = await fetch('http://localhost:4042/api/events')
  console.log('🐕 Fetch Finished!')

  // Parse the JSON into an array of PoshEvent objects
  const json:PoshEventsArray = await response.json()

  if (response.ok) {
    // Tranisition from 'Loading' screen to filtered events
    setLoading(false)
    console.log('PARAMS city :', newParams.get('city'));
    // Filter JSON Results by 'Near Me'
    if(newParams.get('city')  == 'near'){
      geoLocate()
    } else {
    // Filter JSON Results by City
      filterByCity(json)
    }
  } else {
    console.log('🚨 Something went wrong with data fetch ...')
  }


  // Params Hook + Store Params
  const [searchParams, setSearchParams] = useSearchParams()
  let newParams = new URLSearchParams(searchParams.toString())
}