const duration = 5 * 1000
const animationEnd = Date.now() + duration
const skew = 1
const colors = ['#ffcc00', '#e0b400']

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

// ;(function frame() {
const frame = () => {
  const timeLeft = animationEnd - Date.now()
  const ticks = Math.max(300, 600 * (timeLeft / duration))
  skew = Math.max(0.8, skew - 0.001)

  confetti({
    particleCount: 2,
    angle: randomInRange(175, 345), // which direction the confetti launches
    spread: randomInRange(1, 10), // how far off-center the confetti can go; 45 = +- 22.5 degrees from center
    startVelocity: 4, // How fast at the beginning/when launched
    ticks: ticks, // How many times the confetti moves
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
      // y: (Math.random() * skew) - 0.2
      y: 0,
    },
    colors: ['#ffcc00'],
    shapes: ['circle'],
    gravity: randomInRange(1.5, 3),
    scalar: randomInRange(0.6, 1.5),
    drift: randomInRange(2, 10),
  })

  if (timeLeft > 0) {
    requestAnimationFrame(frame)
  }
  // })()
}
