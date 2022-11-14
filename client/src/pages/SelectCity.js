import React from 'react'

import useConfetti from 'hooks/useConfetti.js'

const canvasStyle = {
  zIndex: '2',
  position: 'absolute',
  pointerEvents: 'none',
  inset: '0px',
}

const SelectCity = props => {
  // * SCRIPTS
  // useConfetti()

  // * TEMPLATE
  return (
    <div className='city-selector'>
      <canvas width='1296' height='991' style={canvasStyle}></canvas>
      {/* TODO: The container div should be a flex container */}
      <div className='flex-container'>
        <div className='city-selector-prompt'>Where are you looking for experiences?</div>
        <div className='city-selector-cities'>
          <div className='gold'>
            {/* <img src=''>🗽 New York</img> */}
            {/* TODO: why are these img tags in the original? */}
            <span>🗽 New York</span>
          </div>
          <div className='gold'>
            <span>🌴 Miami</span>
          </div>
          <div className='gold'>
            <span>☀️ Los Angeles</span>
          </div>
          <div className=''>
            {/* TODO: The container div should be a flex container */}
            <span>📍 Near Me</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectCity
