import React, {useEffect, useState} from 'react'

// Passing-in our prop 'event' + destructuring it
const EventDetails = ({poshEvent}) => {
  // * SCRIPTS

  // Re-Format DOTW
  const getDOTW = () => {
    const eventDate = new Date(poshEvent.startUtc.slice(0, 10))
    return eventDate.toLocaleDateString('en-US', {weekday: 'short'})
  }
  let eventDay = getDOTW()

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
