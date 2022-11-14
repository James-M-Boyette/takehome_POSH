import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  // * SCRIPTS

  // * TEMPLATE
  return (
    <header>
      <div className='container'>
        {/* <Link to='/'>
          <h1>Home</h1>
        </Link> */}
        <Link to='/explore'>
          <h1>Explore Events</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
