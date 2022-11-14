import React from 'react'

/**
 *   TODO Delete this file
 */

// import {useEffect, useState} from 'react'

// components
// import WorkoutDetails from '../components/WorkoutDetails.js'
// import WorkoutForm from '../components/WorkoutForm.js'

const canvasStyle = {
  zIndex: '2',
  position: 'absolute',
  pointerEvents: 'none',
  inset: '0px',
}

const Home = () => {
  // * SCRIPTS
  // const [workouts, setWorkouts] = useState(null)
  // While initially 'null', if our fetchWorkouts() gets an 'ok' response, we want to update `workouts` using `setWorkouts`
  // Note: you can check the backend's `getWorkouts()` controller function to see that we're returning a `workouts` array of objects - and we're now parsing + displaying that on the FE

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     // Fetch our data
  //     // const response = await fetch("http://localhost:4043/api/workouts");

  //     // Note: the above will cause a CORS error. One option is to install the 'CORS' package in our backend, but the other, easier way is to
  //     //  1. Add `"proxy": "http://localhost:4000",` to our FE's package.json &
  //     //  2. remove the host+port portion of this url ...
  //     const response = await fetch('/api/workouts')
  //     // Parse the json
  //     const json = await response.json()

  //     if (response.ok) {
  //       setWorkouts(json)
  //     }
  //   }

  //   fetchWorkouts()
  // }, []) // Fires when a component is rendered; in this case, we only want it to fire once (and not fetch every single time the component is re-rendered), so we use an empty dependancy array

  // * TEMPLATE
  return (
    <div>
      <div className='project-heading'>
        <h1>✨ POSH ✨</h1>
        <h2>(Take home test)</h2>
      </div>
      <div className='home'></div>
    </div>
  )
}

export default Home
