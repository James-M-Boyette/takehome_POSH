import React, {useEffect, useState} from 'react'

import {PoshEventObject} from 'interface/poshEventObject'

// Passing-in our prop 'event' + destructuring it
// const EventDetails = (poshEvent: poshEventObject) => {
// function greet(person: { name: string; age: number }) {
const EventDetails = (props: {poshEvent: PoshEventObject}) => {
  // const EventDetails = ({poshEvent}) => {
  const poshEvent = props.poshEvent
  // * SCRIPTS
  console.log(typeof poshEvent)
  // console.log(typeof poshEvent.poshEvent)
  // console.log(typeof poshEvent.poshEvent.name)
  console.log('PoshEvent:', poshEvent.poshEvent)

  // Re-Format DOTW
  const getDOTW = () => {
    // const eventDate = new Date(poshEvent.startUtc.slice(0, 10))
    //
    // const date = new Date(poshEvent.startUtc)
    // const day = date.toLocaleDateString('en-US', {weekday: 'short'})
    // console.log('Date2:', date)
    // console.log('Date3:', day)

    // const date = new Date(poshEvent.startUtc).toLocaleDateString('en-US', {weekday: 'short'})
    // console.log('Date:', date)

    // return eventDate.toLocaleDateString('en-US', {weekday: 'short'})
    return new Date(poshEvent.startUtc).toLocaleDateString('en-US', {weekday: 'short'})
  }
  getDOTW()
  let eventDay = getDOTW()
  // let eventDay = 'Thurs'

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
