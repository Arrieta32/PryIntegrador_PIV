import { useEffect, useRef } from 'react'

export default function PalmParallax() {
  const layerA = useRef(null)
  const layerB = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      if (layerA.current) {
        layerA.current.style.transform = `translate(${x * 12}px, ${y * 8}px)`
      }
      if (layerB.current) {
        layerB.current.style.transform = `translate(${x * -18}px, ${y * 6}px)`
      }
    }

    const onScroll = () => {
      const y = window.scrollY
      if (layerA.current) {
        layerA.current.style.marginTop = `${y * 0.08}px`
      }
      if (layerB.current) {
        layerB.current.style.marginTop = `${y * 0.14}px`
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-sunset opacity-90" />
      <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-neon-orange/25 via-neon-magenta/15 to-transparent" />
      <div className="absolute -top-10 right-[12%] w-56 h-56 rounded-full bg-neon-orange/40 blur-3xl" />
      <div className="absolute top-24 left-[18%] w-40 h-40 rounded-full bg-neon-magenta/30 blur-3xl" />

      <svg
        ref={layerA}
        className="absolute bottom-0 left-[-5%] w-[55%] max-w-xl text-void/90 transition-transform duration-200 ease-out"
        viewBox="0 0 400 320"
        fill="currentColor"
      >
        <Palm path="left" />
      </svg>
      <svg
        ref={layerB}
        className="absolute bottom-0 right-[-8%] w-[60%] max-w-2xl text-void transition-transform duration-200 ease-out"
        viewBox="0 0 400 320"
        fill="currentColor"
      >
        <Palm path="right" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </div>
  )
}

function Palm({ path }) {
  const mirror = path === 'right' ? 'scale(-1,1) translate(-400,0)' : undefined
  return (
    <g transform={mirror}>
      <path d="M198 320 V140" stroke="currentColor" strokeWidth="10" fill="none" />
      <path d="M200 150 C120 120 60 80 40 40 C110 70 160 100 200 150 Z" />
      <path d="M200 145 C140 90 100 40 90 10 C150 50 180 95 200 145 Z" />
      <path d="M200 148 C250 100 310 55 350 25 C300 70 250 110 200 148 Z" />
      <path d="M200 155 C280 130 340 110 380 90 C320 120 260 145 200 155 Z" />
      <path d="M200 160 C160 150 90 160 50 180 C110 165 160 160 200 160 Z" />
    </g>
  )
}
