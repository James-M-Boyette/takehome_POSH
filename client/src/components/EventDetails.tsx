import React, {FunctionComponent} from 'react'

import {PoshEventObject} from 'interface/poshEventObject'

interface Props {
  poshEvent: PoshEventObject
}

// Pass-in our prop 'poshEvent' + destructure it
const EventDetails: FunctionComponent<Props> = ({poshEvent}) => {
  // * SCRIPTS
  // Re-Format 'Day of the Week'
  const getDOTW = () => {
    return new Date(poshEvent.startUtc).toLocaleDateString('en-US', {weekday: 'short'})
  }
  const eventDay = getDOTW()

  // Event URL
  const RedirectPage = () => {
    window.location.replace(`https://posh.vip/e/${poshEvent.url}?t=posh`)
  }

  // * TEMPLATE
  return (
    <div className='event-card' style={{backgroundImage: `url(${poshEvent.flyer})`}} onClick={RedirectPage}>
      <div className='event-card-filter'></div>
      <div className='event-card-info'>
        <div className='event-card-date'>
          <div className='event-card-dotw'>{eventDay}</div>
        </div>
        <div>
          <div className='event-card-name'>{poshEvent.name}</div>
          <div className='event-card-location'>{poshEvent.venueName}</div>
        </div>
      </div>
      <img className='event-card-organizer' src={poshEvent.groupAvi} alt='' />
    </div>
  )
}

export default EventDetails
