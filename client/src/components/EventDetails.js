import React from 'react'

// Passing-in our prop 'event' + destructuring it
const EventDetails = ({event}) => {
  // * SCRIPTS

  // * TEMPLATE
  return (
    <div className='event-details'>
      <h4>{event.name}</h4>
      <p>
        <strong>Venue : </strong>
        {event.venueName}
      </p>
      {/* <img src={event.flyer} alt='' /> */}
      {/* <p>
        <strong>Reps: </strong>
        {event.reps}
      </p>
      <p>{event.createdAt}</p> */}
    </div>
  )
}

export default EventDetails
