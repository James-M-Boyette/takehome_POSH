import {useEffect} from 'react'

const useConfetti = () => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = '../composables/confetti.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
    // }, ['../composables/confetti.js'])
  })
}

export default useConfetti
