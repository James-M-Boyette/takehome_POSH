import React from 'react'

const canvasStyle = {
  zIndex: 2,
  position: 'absolute',
  pointerEvents: 'none',
  inset: '0px',
}

const ExploreEvents = () => {
  // * SCRIPTS

  // * TEMPLATE
  return (
    <div>
      {/* Event Content */}
      <div className='explore'>
        <video
          autoPlay={true}
          playsInline=''
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
                <div className='selected'>This Week</div>
                <div className=''>Today</div>
                <div className=''>🎃 Halloween</div>
              </div>
            </div>
            <div className='explore-body-main-results event-card-grid'></div>
          </div>
        </div>
      </div>

      {/* "Back" Button */}
      <img
        src='https://posh-b2.s3.us-east-2.amazonaws.com/left-arrow-in-circular-button-black-symbol.svg'
        className='explore-back'></img>

      {/* "Loading" placeholder*/}
      {/* <div className='explore-loader fade-out no-pointer'>
        <canvas width='942' height='1048' style={canvasStyle}></canvas>
        <div className='explore-loader-inner'>
          <div className='explore-loader-text '>Finding the best events for you...</div>
          <div className='explore-loader-load-bar '>
            <div></div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ExploreEvents
