import React from 'react'

/**
 * TODO: delete this & wherever it's imported?
 */

const IFrames = () => {
  // * SCRIPTS

  const iframeStyle1 = {
    display: 'none !important',
    width: '1px !important',
    height: '1px !important',
    opacity: '0 !important',
    pointerEvents: 'none !important',
  }
  const iframeStyle2 = {
    border: 'none !important',
    margin: '0px !important',
    padding: '0px !important',
    width: '1px !important',
    minWidth: '100% !important',
    overflow: 'hidden !important',
    display: 'block !important',
    visibility: 'hidden !important',
    position: 'fixed !important',
    height: '1px !important',
    pointerEvents: 'none !important',
    userSelect: 'none !important',
  }
  const iframeStyle3 = {
    border: 'none !important',
    margin: '0px !important',
    padding: '0px !important',
    width: '1px !important',
    minWidth: '100% !important',
    overflow: 'hidden !important',
    display: 'block !important',
    visibility: 'hidden !important',
    position: 'fixed !important',
    height: '1px !important',
    pointerEvents: 'none !important',
    userSelect: 'none !important',
  }
  const iframeStyle4 = {
    display: 'none !important',
    width: '1px !important',
    height: '1px !important',
    opacity: '0 !important',
    pointerEvents: 'none !important',
  }

  // * TEMPLATE
  return (
    <div>
      <iframe id='_hjSafeContext_70287383' src='about:blank' style={iframeStyle1}></iframe>
      <iframe
        name='__privateStripeController0411'
        frameBorder='0'
        allowtransparency='true'
        scrolling='no'
        role='presentation'
        allow='payment *'
        src='https://js.stripe.com/v3/controller-edd1ead8e895fd9bdb7c237a5a268e51.html#apiKey=pk_live_jLhgtO6HT6Sva7Z0f5H4Bq9V00DhtzS9gK&amp;stripeJsId=37fa9091-dbd0-4cac-8f48-d651aa32f943&amp;stripeJsLoadTime=1668104849893&amp;referrer=https%3A%2F%2Fposh.vip%2Fexplore%3Fc%3Dpopular%26t%3Dweek%26p%3D1%26city%3D&amp;controllerId=__privateStripeController0411'
        aria-hidden='true'
        tabIndex='-1'
        style={iframeStyle2}></iframe>
      <iframe
        name='__privateStripeMetricsController0410'
        frameBorder='0'
        allowtransparency='true'
        scrolling='no'
        role='presentation'
        allow='payment *'
        src='https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fposh.vip%2Fexplore%3Fc%3Dpopular%26t%3Dweek%26p%3D1%26city%3D&amp;title=wtw%3F&amp;referrer=&amp;muid=6c68076c-a6b5-4fa8-9a64-82983639ea2e8fc954&amp;sid=NA&amp;version=6&amp;preview=false'
        aria-hidden='true'
        tabIndex='-1'
        style={iframeStyle3}></iframe>
      <iframe
        name='_hjRemoteVarsFrame'
        title='_hjRemoteVarsFrame'
        id='_hjRemoteVarsFrame'
        src='https://vars.hotjar.com/box-c6ca1c87e308a39aabb76b56ba54398b.html'
        style={iframeStyle4}></iframe>
    </div>
  )
}

export default IFrames
