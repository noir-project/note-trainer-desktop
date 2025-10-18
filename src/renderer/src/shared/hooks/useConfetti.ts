import { useCallback } from 'react'
import confetti from 'canvas-confetti'

type ConfettiType = 'fireworks' | 'schoolPride'
type ConfettiTheme = 'gold' | 'fire'

// 🎨 Color palettes for each theme
const CONFETTI_THEMES: Record<ConfettiTheme, string[]> = {
  gold: ['#FFD700', '#FFCC00', '#FFF8DC', '#FFEC8B'], // lvl
  fire: ['#FF4500', '#FF6347', '#FFB347', '#FFCC33', '#FF3300'] // streak
}

type UseConfettiReturn = {
  fireConfetti: (type: ConfettiType, theme: ConfettiTheme) => void
  CONFETTI_THEMES: typeof CONFETTI_THEMES
}

//   const { fireConfetti } = useConfetti()
//   <button onClick={() => fireConfetti('fireworks', 'fire')}>🎆 Fireworks (fire)</button>
//   <button onClick={() => fireConfetti('fireworks', 'gold')}>🌈 School Pride (gold)</button>
//   <button onClick={() => fireConfetti('schoolPride', 'fire')}>🎆 Fireworks (fire)</button>
//   <button onClick={() => fireConfetti('schoolPride', 'gold')}>🌈 School Pride (gold)</button>

export function useConfetti(): UseConfettiReturn {
  const randomInRange = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min
  }, [])

  const fireConfetti = useCallback(
    (type: ConfettiType, theme: ConfettiTheme) => {
      const colors = CONFETTI_THEMES[theme]

      switch (type) {
        case 'fireworks': {
          const duration = 5 * 1000
          const animationEnd = Date.now() + duration
          const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 1000,
            colors
          }

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now()
            if (timeLeft <= 0) return clearInterval(interval)

            const particleCount = 50 * (timeLeft / duration)
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
          }, 250)
          break
        }

        case 'schoolPride': {
          const end = Date.now() + 5 * 1000

          ;(function frame() {
            confetti({
              particleCount: 2,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors
            })
            confetti({
              particleCount: 2,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors
            })

            if (Date.now() < end) requestAnimationFrame(frame)
          })()
          break
        }

        default:
          console.warn('Unknown confetti type')
      }
    },
    [randomInRange]
  )

  return { fireConfetti, CONFETTI_THEMES }
}
